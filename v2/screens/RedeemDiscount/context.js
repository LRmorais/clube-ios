import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';
import deburr from 'lodash.deburr';

import axios from 'axios';
import {CORE_URL} from '../../constants/env';

import API from '../../helpers/api';
import {getDistance} from '../../utils/map';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo, deviceLocation} = useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();
  const [method, setMethod] = useState('qrcode');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const from = {
    type: props.navigation.getParam('type'),
    id: props.navigation.getParam('id'),
  };

  const viewing = searchValue.trim()
    ? 'search'
    : from && from.type === 'place'
    ? 'specific'
    : 'nearby';

  async function getSearchData() {
    let base_url;
    let places;
    try {
      base_url = `${CORE_URL}partnerApp/allUnits/`;
      const response = await axios.get(`${base_url}`);
      places = response.data[0];
    } catch (error) {
      console.error(error);
    }

    const searchRegex = new RegExp(deburr(searchValue.trim()), 'i');
    return places.filter(place => searchRegex.test(deburr(place.fantasyName)));
  }

  async function getSpecificData() {
    let base_url;
    let place;
    try {
      base_url = `${CORE_URL}partnerApp/unit/${from.id}`;
      const response = await axios.get(`${base_url}`);
      place = response.data[0];
    } catch (error) {
      console.error(error);
    }

    return place;
  }

  async function getNearbyData() {
    let base_url;
    let places;
    try {
      base_url = `${CORE_URL}partnerApp/allUnits/`;
      const response = await axios.get(`${base_url}`);
      places = response.data[0];
    } catch (error) {
      console.error(error);
    }

    if (!deviceLocation) {
      return places.slice(0, 3);
    }

    let deviceCoords = {
      lat: deviceLocation.coords.latitude,
      lng: deviceLocation.coords.longitude,
    };
    return places
      .sort((one, another) => {
        let oneDistance = getDistance(deviceCoords, {
          lat: Number(one.latitude),
          lng: Number(one.longitude),
        });
        let anotherDistance = getDistance(deviceCoords, {
          lat: Number(another.latitude),
          lng: Number(another.longitude),
        });
        return oneDistance - anotherDistance;
      })
      .slice(0, 3);
  }

  const getData = {
    search: getSearchData,
    specific: getSpecificData,
    nearby: getNearbyData,
  }[viewing];
  const data = getData();

  useEffect(() => {
    dispatchRecord('Método de resgate', {
      value: method,
    });
  }, [method]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToCheckInPage() {
    props.navigation.navigate('QRCodeReader');
  }

  function goToGenerateCardPage() {
    props.navigation.navigate('GenerateCard');
  }

  async function handleQRCodeRead(e) {
    if (loading || feedback) {
      return;
    }

    let url = e.data || '';
    if (!/^https:\/\/clube\.gazetadopovo\.com\.br\//.test(url)) {
      return;
    }
    try {
      setLoading(true);
      dispatchRecord('Tentativa de leitura de QRCode', {
        value: url,
      });
      let result = await API.call({
        method: 'post',
        url: '/api/repository/qrCodeValidation/read',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          url,
        },
      });
      let {id} = (result.data || {}).partnerUnit || {};
      if (id) {
        setLoading(false);
        dispatchRecord('Leitura de QRCode com sucesso', {
          value: url,
          partnerUnitId: id,
        });
        props.navigation.replace('DiscountResult', {
          type: 'place',
          id: result.data.partnerUnit.id,
          evaluationId: result.data.id,
          data: {
            ...result.data.partnerUnit,
            partner: result.data.partnerUnit.Partner,
            Partner: undefined,
          },
        });
      } else {
        setLoading(false);
        setFeedback('error');
      }
    } catch {
      setLoading(false);
      setFeedback('error');
      //
    }
  }

  function goToDiscountResultScreenHOF(data) {
    return function () {
      props.navigation.navigate('DiscountResult', {
        type: 'place',
        id: data.id,
      });
    };
  }

  function hideFeedback() {
    setFeedback(false);
  }

  const value = {
    method,
    setMethod,
    loading,
    feedback,
    searchValue,
    setSearchValue,
    viewing,
    data,
    returnToPreviousScreen,
    handleQRCodeRead,
    goToCheckInPage,
    goToGenerateCardPage,
    goToDiscountResultScreenHOF,
    hideFeedback,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
