import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';

import API from '../../helpers/api';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAPIContext } from '../../hocs/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    userInfo,
  } = useGlobalStateContext();
  const {
    canCall,
  } = useAPIContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const notUsed = data && data.filter((item) => item.status !== 3).length;
  const alreadyRequested = data && data.some((item) => item.status === 2);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      let result = await API.call({
        method: 'get',
        url: '/api/get/referFriends',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      setData(result.data);
    } catch {
      setError(!canCall ? 'noInternet' : 'any');
    } finally {
      setLoading(false);
    }
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function hideFeedback() {
    setFeedback(null);
  }

  function requestValue() {
    if (notUsed < 5) {
      setFeedback('notEnough');
      return;
    }

    if (!alreadyRequested) {
      API.call({
        method: 'post',
        url: '/api/rescueBonus',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          clientGazetaSource: userInfo.id,
        },
      }, true);
    }
    setFeedback('success');
  }

  const value = {
    data,
    loading,
    error,
    feedback,
    notUsed,
    returnToPreviousScreen,
    hideFeedback,
    requestValue,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
