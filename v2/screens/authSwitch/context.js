import React, { createContext, useContext as useReactContext } from 'react';
import { Linking } from 'react-native';

import { useLayoutContext } from '../../hocs/layout';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    palette,
  } = useLayoutContext();
  const screenPalette = palette.auth_switch;

  function goToSignInScreen() {
    props.navigation.navigate('SignIn');
  }

  function goToSignUpScreen() {
    props.navigation.navigate('SignUp');
    // Linking.openURL('https://clube.gazetadopovo.com.br/assine/?offerId=3c59dc048e8850243be8079a5c74d079&utm_source=app&utm_medium=redirect&utm_campaign=julho').catch(() => {});
  }

  const value = {
    screenPalette,
    goToSignInScreen,
    goToSignUpScreen,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
