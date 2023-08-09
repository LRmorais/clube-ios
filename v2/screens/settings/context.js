import React, { createContext, useContext as useReactContext, useState, useEffect } from 'react';

import { usePermissionsContext } from '../../hocs/permissions';
import { useAnalyticsContext } from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    permissionsStatus,
    updatePermissionsStatus,
    lock,
    unlock,
  } = usePermissionsContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const [values, setValues] = useState(permissionsStatus || {});

  useEffect(() => {
    updatePermissionsStatus();
  }, []);

  useEffect(() => {
    setValues(permissionsStatus);
    dispatchRecord('Status de permissões', {
      json: permissionsStatus,
    });
  }, [permissionsStatus]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function handleSwitchChangeHOF(resource) {
    return async function(checked) {
      setValues((values) => ({
        ...values,
        [resource]: checked,
      }));
      if (!checked) return lock(resource);
      let unlockedOnes = await unlock(resource);
      if (!unlockedOnes) {
        setValues((values) => ({
          ...values,
          [resource]: false,
        }));
      }
    }
  }

  function goToPaymentMethodsScreen() {
    props.navigation.navigate('PaymentMethods');
  }

  const value = {
    values,
    returnToPreviousScreen,
    goToPaymentMethodsScreen,
    handleSwitchChangeHOF,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
