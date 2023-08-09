import React, {
  createContext,
  useContext as useReactContext,
  useState,
  useEffect,
} from 'react';

import API from '../../helpers/api';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAPIContext} from '../../hocs/api';
import axios from 'axios';

import {CORE_URL} from '../../constants/env';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {userInfo, paymentOrders} = useGlobalStateContext();
  const {canCall} = useAPIContext();
  const [uses, setUses] = useState(null);
  const [payments, setPayments] = useState(null);
  const [loadingUses, setLoadingUses] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [tab, setTab] = useState(
    props.navigation.getParam('activeTab', 'default'),
  );
  const [pendingPayments, setPendingPayments] = useState(0);

  useEffect(() => {
    getUses();
    getPayments();
  }, []);

  useEffect(() => {
    let pendingPayments =
      paymentOrders?.filter(order => order.situation === 1).length || 0;
    setPendingPayments(pendingPayments);
  }, [paymentOrders]);

  async function getUses() {
    try {
      setLoadingUses(true);
      let result = await API.call({
        method: 'get',
        url: '/api/get/validations',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      setUses(result.data);
    } catch {
      if (!canCall) {
        setUses(false);
      }
    } finally {
      setLoadingUses(false);
    }
  }

  async function getPartnerUnit(id) {
    let base_url = `${CORE_URL}partnerApp/unit/${id}`;
    try {
      const response = await axios.get(`${base_url}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getPayments() {
    try {
      setLoadingPayments(true);
      let result = await API.call({
        method: 'get',
        url: '/api/get/creditCardPaymentsList',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
      console.log('teste');
      setPayments(
        result.data
          .sort((one, another) => another.id - one.id)
          .map(item => ({
            ...(item.ClientGazetaValidation || {}),
            ...item,
            PartnerUnit: {
              ...item.PartnerUnit,
              ...(getPartnerUnit(item.PartnerUnit.id) || {}),
            },
            ClientGazetaValidation: undefined,
          })),
      );
    } catch {
      if (!canCall) {
        setPayments(false);
      }
    } finally {
      setLoadingPayments(false);
    }
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function goToEvaluationScreenHOF(data) {
    return function () {
      props.navigation.replace('Evaluation', {
        placeId: data.partnerUnitId,
        evaluationId: data.id,
      });
    };
  }

  function goToPlaceDetailsScreenHOF(data) {
    // if (!generalData.unitsByID[data.id]) {
    //   return;
    // }

    return function () {
      props.navigation.navigate('PlaceDetails', {
        id: data.id,
      });
    };
  }

  function goToCheckoutScreenHOF(data) {
    return function () {
      props.navigation.navigate('Checkout', {
        paymentOrderID: data.id,
      });
    };
  }

  const value = {
    uses,
    payments,
    loadingUses,
    loadingPayments,
    tab,
    setTab,
    pendingPayments,
    returnToPreviousScreen,
    goToEvaluationScreenHOF,
    goToPlaceDetailsScreenHOF,
    goToCheckoutScreenHOF,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
