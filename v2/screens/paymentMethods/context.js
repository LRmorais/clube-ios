import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

import API from '../../helpers/api';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAnalyticsContext } from '../../hocs/analytics';
import { useAPIContext } from '../../hocs/api';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    userInfo,
  } = useGlobalStateContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    canCall,
  } = useAPIContext();
  const [paymentMethods, setPaymentMethods] = useState(props.navigation.getParam('paymentMethods', null));
  const [selectedID, setSelectedID] = useState(props.navigation.getParam('selectedID', null));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const from = props.navigation.getParam('from');
  const selecting = props.navigation.getParam('selecting', false);

  useEffect(() => {
    getPaymentMethods();
  }, []);

  async function getPaymentMethods(force = false) {
    if (paymentMethods && !force) return refreshSelectedID(paymentMethods);

    if (!canCall) return setError('internet');

    try {
      setLoading(true);
      let result = await API.call({
        method: 'get',
        url: '/api/get/clientGazetaCreditCard',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
      });
      if (result.status !== 200) throw null;

      let paymentMethods = result.data.sort((one, another) => another.isDefault - one.isDefault);
      setPaymentMethods(paymentMethods);
      props.navigation.setParams({ paymentMethods });
      refreshSelectedID(paymentMethods);
    } catch {
      setError('any');
    } finally {
      setLoading(false);
    }
  }

  function refreshSelectedID(paymentMethods) {
    let refreshedSelectedID = paymentMethods.find((method) => method.id === selectedID)?.id;
    setSelectedID(refreshedSelectedID);
    props.navigation.setParams({
      selectedID: refreshedSelectedID,
    });
  }

  function hideError() {
    setError(false);
  }

  function returnToPreviousScreen() {
    if (!from) return props.navigation.goBack();

    props.navigation.replace(from, {
      ...(props.navigation.state.params || {}),
      chosenPaymentMethod: paymentMethods?.find((method) => method.id === selectedID),
    });
  }

  function returnToPreviousScreenIfPossible() {
    if (selecting && !selectedID) return setError('noMethod');

    returnToPreviousScreen();
  }

  function goToAddPaymentMethodScreen() {
    props.navigation.replace('AddPaymentMethod', props.navigation.state.params);
  }

  function getOptionsHOF(data) {
    function updateInfo(action) {
      let updatedInfo = {
        delete: {
          situation: 2,
        },
        setAsDefault: {
          isDefault: 1,
        },
      }[action];
      let message = {
        delete: 'Excluir cartão',
        setAsDefault: 'Definir como padrão',
      }[action];
      let eventDescription = {
        delete: 'Exclusão de meio de pagamento',
        setAsDefault: 'Definição de meio de pagamento principal',
      }[action];

      async function handleOKPress() {
        try {
          setLoading(true);
          await API.call({
            method: 'post',
            url: '/api/create/updateCreditCard',
            headers: {
              Authorization: `Bearer ${userInfo.tokenJWTClube}`,
            },
            data: {
              ...data,
              ...updatedInfo,
            },
          });
          if (eventDescription) dispatchRecord(eventDescription);
          getPaymentMethods(true);
        } catch {
          setLoading(false);
          setFeedback('itemChange');
        }
      }

      return function() {
        Alert.alert(message, 'Tem certeza disso?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'OK', onPress: handleOKPress },
        ], { cancelable: true });
      }
    }

    return [
      !data.isDefault && ['Definir como padrão', updateInfo('setAsDefault')],
      ['Excluir', updateInfo('delete')],
    ].filter(Boolean);
  }

  function choosePaymentMethodHOF(data) {
    if (!from) return;

    return function() {
      props.navigation.replace(from, {
        ...(props.navigation.state.params || {}),
        chosenPaymentMethod: data,
      });
    }
  }

  const value = {
    paymentMethods,
    selectedID,
    loading,
    error,
    selecting,
    hideError,
    returnToPreviousScreen,
    returnToPreviousScreenIfPossible,
    goToAddPaymentMethodScreen,
    getOptionsHOF,
    choosePaymentMethodHOF,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
