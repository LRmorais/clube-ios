import React, { createContext, useContext as useReactContext, useState, useEffect,useRef } from 'react';
import { Linking } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import API from '../../helpers/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const id = props.navigation.getParam('id');
  const title = props.navigation.getParam('title');
  const image = props.navigation.getParam('image');
  const subtitle = props.navigation.getParam('legend');
  const date = moment(props.navigation.getParam('publishedData') || props.navigation.getParam('createdAt')).format('DD [de] MMMM[,] YYYY');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);


  useEffect(() => {
    getDetails();
  }, []);

  async function getDetails() {
    try {
      setLoading(true);
      let result = await API.call({
        method: 'get',
        url: `/api/repository/whilelabel/news/contents/${id}.json`,
      });
      setContent(result?.data?.content || null);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  async function openLink(url) {
    if (url.startsWith('https://clube.gazetadopovo.com.br/noticias?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet')) return goToNewsDetailsScreen(url);

    if (!url.startsWith('https://clube.gazetadopovo.com.br?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet')) return Linking.openURL(url).catch(() => {});

    try {
      setChecking(true);
      let result = await API.call({
        method: 'get',
        url: `/api/checkUrl/check/${encodeURIComponent(url)}`,
      });
      setChecking(false);
      if (result.data.type === 'partnerUnit') return goToPlaceDetailsScreen(result.data.id);
      Linking.openURL(url).catch(() => {});
    } catch {
      setChecking(false);
      Linking.openURL(url).catch(() => {});
    }
  }

  function goToNewsDetailsScreen(params) {
    props.navigation.navigate('NewsDetails', params);
  }

  function goToPlaceDetailsScreen(params) {
    props.navigation.navigate('PlaceDetails', {
      id: params.id,
      from: {
        screenType: 'specificNews',
      },
    });
  }

  const value = {
    title,
    image,
    subtitle,
    date,
    content,
    loading,
    checking,
    returnToPreviousScreen,
    openLink,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
