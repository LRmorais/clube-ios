import React, { createContext, useContext as useReactContext } from 'react';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
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
