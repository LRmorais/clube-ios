import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';

import API from '../../helpers/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState(false);
  const screenType = props.navigation.getParam('type');
  const entityId = props.navigation.getParam('id');
  const title = props.navigation.getParam('title');

  useEffect(() => {
    getRatings();
  }, []);

  const getRatings = {
    place: getPlaceRatings,
  }[screenType];

  async function getPlaceRatings() {
    try {
      setLoadingData(true);
      let result = await API.call({
        method: 'get',
        url: `/api/partner/partnerUnity/validations/${entityId}`,
      });
      setData(
        (result.data || []).filter(
          validation => validation.status === 1 || validation.status === 2,
        ),
      );
    } catch {
      setError(true);
    } finally {
      setLoadingData(false);
    }
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  const value = {
    data,
    loadingData,
    error,
    title,
    returnToPreviousScreen,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
