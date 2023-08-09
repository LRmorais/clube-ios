import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';
import axios from 'axios';
import {CORE_URL} from '../../constants/env';

import {useGlobalStateContext} from '../../hocs/globalState';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {deviceLocation} = useGlobalStateContext();
  const [units, setUnits] = useState();
  const partnerId = props.navigation.getParam('partnerId');

  // buscando na api do core -------

  useEffect(() => {
    if (partnerId) {
      getPartnerUnit();
    }
  }, [partnerId]);

  async function getPartnerUnit() {
    let base_url = '';
    try {
      if (deviceLocation) {
        base_url = `${CORE_URL}partnerApp/partnerUnits/${partnerId}?lat=${deviceLocation.coords?.latitude}&lng=${deviceLocation.coords?.longitude}`;
      } else {
        base_url = `${CORE_URL}partnerApp/partnerUnits/${partnerId}`;
      }

      const response = await axios.get(`${base_url}`);
      setUnits(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  // -------------------------------

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToPartnerDetails(data) {
    return function () {
      props.navigation.navigate('PartnerDetails', {unitId: data.id});
    };
  }

  const value = {
    units,
    returnToPreviousScreen,
    goToPartnerDetails,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
