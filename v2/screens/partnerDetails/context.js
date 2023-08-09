/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useState,
  createContext,
  useContext as useReactContext,
  useRef,
} from 'react';
import {Share, Linking} from 'react-native';
import axios from 'axios';

import {CORE_URL} from '../../constants/env';
import GraphQL from '../../helpers/graphql';

import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {deviceLocation, userInfo} = useGlobalStateContext();
  const [unit, setUnit] = useState();
  const {dispatchRecord} = useAnalyticsContext();
  const iconRef = useRef();
  const id = props.navigation.getParam('unitId');
  const {typeCategorie} = props.navigation.getParam('from');
  const [movies, setMovies] = useState([]);

  // buscando na api do core -------
  useEffect(() => {
    if (id) {
      getPartnerUnit();
      getMovies(id);
    }
  }, [id]);
  async function getPartnerUnit() {
    let base_url = '';
    try {
      if (deviceLocation) {
        base_url = `${CORE_URL}partnerApp/unit/${id}?lat=${deviceLocation.coords?.latitude}&lng=${deviceLocation.coords?.longitude}`;
      } else {
        base_url = `${CORE_URL}partnerApp/unit/${id}`;
      }
      const response = await axios.get(`${base_url}`);
      setUnit(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  async function getMovies(partnerUnitId) {
    try {
      let result = await GraphQL({
        query: `{
          getMovies(partnerUnitId: ${partnerUnitId}){
            id
            title
            cover
          }
        }`,
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      if (result.status !== 200) {
        throw null;
      }
      setMovies(result.data.data.getMovies);
    } catch (e) {
      console.log(e);
    }
  }
  // -------------------------------

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }
  function goUnitsList() {
    props.navigation.navigate('PartnerUnitList', {partnerId: unit.partnerId});
  }

  function goToMovieDetailsScreenHOF(item) {
    let {id} = item;
    return function () {
      props.navigation.navigate('MovieDetails', {
        id,
      });
    };
  }

  function goToMoviesScreen() {
    props.navigation.navigate('Movies', {
      from: unit?.unitId,
    });
  }

  function goToImageScreenHOF(index) {
    return function () {
      props.navigation.navigate('Image', {
        data: unit.images,
        index,
        core: true,
      });
    };
  }

  function share() {
    let sharingUrl = `https://clube.gazetadopovo.com.br/descontos/${unit.category}/${unit.tagSlug}/${unit.partnerSlug}/`;
    try {
      dispatchRecord('Compartilhamento');
      Share.share({
        message:
          'Olha o que eu vi no Clube Gazeta e achei a sua cara! (:\n' +
          sharingUrl,
        // url: sharingUrl,
      });
    } catch {
      //
    }
  }

  function showOptions() {
    share();
  }

  function sendLinkRecord(url) {
    Linking.openURL(`${unit.purchaseInClubURL}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  const value = {
    unit,
    iconRef,
    returnToPreviousScreen,
    showOptions,
    sendLinkRecord,
    goUnitsList,
    typeCategorie,
    movies,
    goToMovieDetailsScreenHOF,
    goToMoviesScreen,
    goToImageScreenHOF,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
