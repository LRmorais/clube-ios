import React, { createContext, useContext as useReactContext } from 'react';
import { Linking } from 'react-native';

import { useAnalyticsContext } from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    dispatchRecord,
  } = useAnalyticsContext();

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function sendLinkRecord(url) {
    Linking.openURL(`${url}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`).catch(() => {});
    dispatchRecord('Abertura de link', {
      value: url,
    });
  }

  const value = {
    returnToPreviousScreen,
    sendLinkRecord,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
