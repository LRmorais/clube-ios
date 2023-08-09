import React, { createContext, useContext as useReactContext } from 'react';

import { useGlobalStateContext } from '../../hocs/globalState';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    user,
  } = useGlobalStateContext();

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  const value = {
    returnToPreviousScreen,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
