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
  const itemsPerBatch = 7;
  const dataEnded = itemsPerBatch * page >= generalData?.specificNews?.length;

  useEffect(() => {
    setData(generalData?.specificNews?.slice(0, page * itemsPerBatch));
  }, [page]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToSpecificNewsDetailsScreenHOF(params) {
    return function() {
      props.navigation.navigate('SpecificNewsDetails', params);
    }
  }

  async function showNextPage() {
    setPage((page) => page +1);
  }

  const value = {
    data,
    dataEnded,
    returnToPreviousScreen,
    goToSpecificNewsDetailsScreenHOF,
    showNextPage,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
