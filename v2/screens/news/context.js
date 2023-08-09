import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';

import { useGlobalStateContext } from '../../hocs/globalState';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    generalData,
  } = useGlobalStateContext();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (!generalData?.news) return;

    setData(generalData.news.slice(0, page * 7));
  }, [page, generalData?.news]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToNewsDetailsScreenHOF(params) {
    return function() {
      props.navigation.navigate('NewsDetails', params);
    }
  }

  async function showNextPage() {
    setPage((page) => page +1);
  }

  const value = {
    data,
    returnToPreviousScreen,
    goToNewsDetailsScreenHOF,
    showNextPage,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
