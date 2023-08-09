import React, {createContext, useContext, useState, useEffect} from 'react';
import netInfo from '@react-native-community/netinfo';

import API from '../helpers/api';

const Context = createContext();
export const useAPIContext = () => useContext(Context);

const APIProvider = props => {
  const [executingStack, setExecutingStack] = useState(false);
  const [canCall, setCanCall] = useState(null);

  async function tryToCleanRequestsStack() {
    if (executingStack) {
      return;
    }

    setExecutingStack(true);
    await API.executeStack();
    setExecutingStack(false);
  }

  useEffect(() => {
    const unsubscribe = netInfo.addEventListener(netState => {
      let canCall = netState.isConnected && netState.isInternetReachable;
      setCanCall(canCall);
      if (canCall) {
        tryToCleanRequestsStack();
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    executingStack,
    canCall,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default APIProvider;
