import React, {createContext, useContext as useReactContext} from 'react';
import {Linking} from 'react-native';

import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {dispatchRecord} = useAnalyticsContext();
  const muralData = props.navigation.getParam('data');

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function openCTAHOF(item) {
    return function () {
      try {
        dispatchRecord('Abertura de link', {
          value: item.link,
        });
        Linking.openURL(`${item.link}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`);
      } catch {
        //
      }
    };
  }

  function sendLinkRecord(url) {
    Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  const value = {
    muralData,
    returnToPreviousScreen,
    openCTAHOF,
    sendLinkRecord,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
