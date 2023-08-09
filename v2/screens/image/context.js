import React, {createContext, useContext as useReactContext} from 'react';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const data = props.navigation.getParam('data');
  const index = props.navigation.getParam('index');
  const newUnit = props.navigation.getParam('core');

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  const value = {
    data,
    index,
    newUnit,
    returnToPreviousScreen,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
