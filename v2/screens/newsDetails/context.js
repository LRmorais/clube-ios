import React, { createContext, useContext as useReactContext, useRef, useState } from 'react';
import { Linking } from 'react-native';
import Share from 'react-native-share';

import showOptionsMenu from '../../helpers/optionsMenu';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAnalyticsContext } from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {

  const title = props.navigation.state.params.title
  const {
    generalData,
  } = useGlobalStateContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const { getParam } = props.navigation;
  const url = getParam('url', 'https://clube.gazetadopovo.com.br' +  getParam('slug'));

  const [loading, setLoading] = useState(true);
  const iconRef = useRef();

  if (!generalData) {
    props.navigation.replace('Splash', {
      screen: 'NewsDetails',
      params: props.navigation.state.params,
    });
    return null;
  }

  function returnToPreviousScreen() {
    props.navigation.goBack() || props.navigation.replace('Home');
  }

  // function share() {
  //   try {
  //     dispatchRecord('Compartilhamento');
  //     Share.open({
  //       message: 'Olha o que eu vi no Clube Gazeta e achei a sua cara! (:\n' + url,
  //       url,
  //     });
  //   } catch {
  //     //
  //   }
  // }

  // function showOptions() {
  //   showOptionsMenu(
  //     [
  //       ['Compartilhar', share],
  //     ],
  //     iconRef.current
  //   );
  // }
  const customShare = async() => {
    const shareoptions = {
      message: 'Olha o que eu vi no Clube Gazeta e achei a sua cara! (:\n' + url,
      url,
    }

    try{
      dispatchRecord('Compartilhamento');
      const ShareResponse = await Share.open(shareoptions);
    }catch(error){
      console.log('Error', error)
    }
  };

  async function openLink(url) {
    if (url.startsWith('https://clube.gazetadopovo.com.br/noticias/')) return goToNewsDetailsScreen(url);
    if (url.startsWith('https://clube.gazetadopovo.com.br/descontos/')) {
      let { unitSlug, otherCategory } = url.match(/descontos\/[^\/]*?\/(?<otherCategory>[^\/]*?)\/([^\/]*?\/#_(?<unitSlug>.+))?$/)?.groups || {};
      if (unitSlug) return goToPlaceDetailsScreen(unitSlug);
      if (otherCategory) return goToPlacesScreen({
        0: 'categorias',
        slug: otherCategory,
      });
    }
    Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
  }

  function goToNewsDetailsScreen(url) {
    props.navigation.navigate('NewsDetails', {
      url,
    });
  }

  function goToPlaceDetailsScreen(unitSlug) {
    props.navigation.navigate('PlaceDetails', {
      unitSlug,
      from: {
        screenType: 'news',
      },
    });
  }

  function goToPlacesScreen(params) {
    props.navigation.navigate('Places', params);
  }

  const value = {
    url,
    loading,
    setLoading,
    iconRef,
    returnToPreviousScreen,
    openLink,
    title,
    customShare
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
