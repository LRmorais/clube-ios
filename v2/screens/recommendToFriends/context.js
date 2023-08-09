import React, { createContext, useContext as useReactContext } from 'react';

import { useGlobalStateContext } from '../../hocs/globalState';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    userInfo,
  } = useGlobalStateContext();

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToConvertedFriendsScreen() {
    props.navigation.replace('ConvertedFriends');
  }

  const userShareLink = `https://indiqueamigos.clubegazetadopovo.com.br/?userId=${userInfo.id}`;

  const value = {
    returnToPreviousScreen,
    goToConvertedFriendsScreen,
    userShareLink,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
