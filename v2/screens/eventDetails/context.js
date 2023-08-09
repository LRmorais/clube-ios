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

import showOptionsMenu from '../../helpers/optionsMenu';
import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const [eventDetail, setEventDetail] = useState();
  const {dispatchRecord} = useAnalyticsContext();
  const iconRef = useRef();
  const id = props.navigation.getParam('id');

  // buscando na api do core -------

  useEffect(() => {
    if (id) {
      getEventsHome();
    }
  }, [id]);
  async function getEventsHome() {
    try {
      const response = await axios.get(`${CORE_URL}events/id/${id}`);
      setEventDetail(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  }
  // -------------------------------
  const place = eventDetail?.eventPlace;
  const placeDescription =
    place &&
    [
      place.address && place.number && `${place.address}, ${place.number}`,
      place.neighborhood &&
        place.city &&
        place.uf &&
        `${place.neighborhood}, ${place.city} - ${place.uf}`,
      place.zipcode && place.zipcode,
    ]
      .filter(phrase => !!phrase)
      .join('\n');
  const showAddress = placeDescription && placeDescription.length > 0;

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function share() {
    let mainCategory = eventDetail.Tag?.tagsTopSlug || 'lazer';
    let otherCategory = eventDetail.Tag?.slug;
    let eventSlug = eventDetail.slug;
    let sharingUrl = `https://clube.gazetadopovo.com.br/descontos/${mainCategory}/${otherCategory}/${eventSlug}/`;
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
    showOptionsMenu([['Compartilhar', share]], iconRef.current);
  }

  function sendLinkRecord(url) {
    Linking.openURL(`${eventDetail.purchaseInClubURL}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  const value = {
    iconRef,
    eventDetail,
    place,
    placeDescription,
    showAddress,
    returnToPreviousScreen,
    showOptions,
    sendLinkRecord,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
