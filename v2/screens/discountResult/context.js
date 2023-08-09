import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';
import {Linking} from 'react-native';

import API from '../../helpers/api';
import axios from 'axios';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import {CORE_URL} from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo} = useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState();
  const [vouchers, setVouchers] = useState(null);
  const [loadingVouchers, setLoadingVouchers] = useState();
  const {getParam} = props.navigation;
  const thingType = getParam('type');
  const thingId = getParam('id');
  const evaluationId = getParam('evaluationId');
  const data = getParam('data');
  const [events, setEvents] = useState([]);
  const [partnerUnitById, setPartnerUnitById] = useState([]);
  const paymentDetails = getParam('paymentInfo');
  const thing = thingType === 'event' ? events : partnerUnitById;

  useEffect(() => {
    if (thingType === 'place' || 'movieTicket') {
      getPartnerUnit();
    }
    if (thingType === 'event') {
      getEvents();
    }
  }, [thingId]);
  console.log(thingType);
  async function getEvents() {
    setLoading(true);
    try {
      const response = await axios.get(`${CORE_URL}events/id/${thingId}`);
      setEvents(response.data[0]);
      console.log('event', response.data[0]);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function getPartnerUnit() {
    setLoading(true);
    let base_url = '';
    if (thingType === 'place') {
      try {
        base_url = `${CORE_URL}partnerApp/unit/${thingId}`;
        const response = await axios.get(`${base_url}`);
        setPartnerUnitById(response.data[0]);
      } catch (error) {
        console.error(error);
        props.navigation.goBack();
      }
    } else if (thingType === 'movieTicket') {
      setPartnerUnitById(data);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (evaluationId !== undefined || thingType !== 'place') {
      return;
    }

    API.call({
      method: 'post',
      url: '/api/repository/qrCodeValidation/manualCard',
      headers: {
        Authorization: `Bearer ${userInfo.tokenJWTClube}`,
      },
      data: {
        partnerUnitId: thing.id,
      },
    });
  }, []);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function handleRatingChange(value) {
    setRating(value);
    props.navigation.replace('Evaluation', {
      placeId: thingId,
      evaluationId,
      preset: value,
    });
  }

  async function getVouchers() {
    if (loadingVouchers) {
      return;
    }

    try {
      setLoadingVouchers(true);
      dispatchRecord('Obtenção de vouchers');
      let what = {
        event: 'event',
        place: 'partner',
      }[thingType];
      let id = {
        event: thing?.id,
        place: thing?.partnerId,
      }[thingType];
      let result = await API.call({
        method: 'get',
        url: `/api/partner/getVoucher/${what}/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      setVouchers({
        list: result.data.userVoucher,
        message: result.data.message,
      });
      console.log(result.data);
    } catch(e) {
      console.log('erro na api: ', e);
      //
    } finally {
      setLoadingVouchers(false);
    }
  }

  function sendLinkRecord(url) {
    Linking.openURL(url).catch(() => {});
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  const value = {
    loading,
    rating,
    vouchers,
    loadingVouchers,
    thingType,
    evaluationId,
    paymentDetails,
    thing,
    returnToPreviousScreen,
    handleRatingChange,
    getVouchers,
    sendLinkRecord,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
