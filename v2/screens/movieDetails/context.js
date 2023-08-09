import React, {
  createContext,
  useContext as useReactContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import { Share, Linking } from 'react-native';
import axios from 'axios';

import { useAnalyticsContext } from '../../hocs/analytics';

import { CORE_URL } from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const { dispatchRecord } = useAnalyticsContext();
  const iconRef = useRef();
  const id = props.navigation.getParam('id');
  const [movieById, setMovieById] = useState([]);
  const [activeDay, setActiveDay] = useState('');
  const [hasTickets, setHasTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  // buscando na api do core -------

  useEffect(() => {
    if (id) {
      getMovie();
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      getMovie();
    }
  }, [id]);

  async function getMovie() {
    setLoading(true);
    let base_url = `${CORE_URL}movies/${id}}`;
    let base_url2 = `${CORE_URL}movies/tickets/group/app`;
    try {
      // const response = await axios.get(`${base_url}`);
      // setMovieById(response.data[0]);
      // setActiveDay(response.data[0]?.days[0]);
      // setLoading(false);

      await axios.all([
        axios.get(`${base_url}`).then(({ data }) => {
          setMovieById(data[0]);
          setActiveDay(data[0]?.days[0]);
          setLoading(false);
        }),

        axios.get(`${base_url2}`).then(({ data }) => setHasTickets(data)),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  // -------------------------------

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToPlaceDetailsScreenHOF(placeID) {
    return function () {
      props.navigation.navigate('PartnerDetails', {
        id: placeID,
        unitId: placeID,
        from: {
          typeCategorie: 'Cinemas',
          screenType: 'movie',
          id,
        },
      });
    };
  }

  function share() {
    let sharingUrl = `https://clube.gazetadopovo.com.br/filmes/${movieById.slug}`;
    try {
      dispatchRecord('Compartilhamento');
      Share.share({
        message:
          'Olha o que eu vi no Clube Gazeta e achei a sua cara! (:\n' +
          sharingUrl,
        url: sharingUrl,
      });
    } catch {
      //
    }
  }

  function showOptions() {
    share();
  }

  function sendLinkRecord(url) {
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  function openPurchaseLinkHOF(place) {
    return function () {
      try {
        dispatchRecord('Abrir link de compra', {
          value: place.purchaseInClubURL,
        });
        Linking.openURL(`${place.purchaseInClubURL}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
      } catch {
        //
      }
    };
  }
  function openPurchaseLink(slug) {
    dispatchRecord('Abrir link de compra', {
      value: `https://clube.gazetadopovo.com.br/zet/cinemas/${slug}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`,
    });

    Linking.openURL(`https://clube.gazetadopovo.com.br/zet/cinemas/${slug}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
  }

  const value = {
    iconRef,
    hasTickets,
    movieById,
    activeDay,
    loading,
    returnToPreviousScreen,
    goToPlaceDetailsScreenHOF,
    showOptions,
    sendLinkRecord,
    openPurchaseLinkHOF,
    openPurchaseLink,
    setActiveDay,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
