import React, { createContext, useContext as useReactContext, useState, useReducer, useRef } from 'react';
import { Keyboard } from 'react-native';

import API from '../../helpers/api';
import { useLayoutContext } from '../../hocs/layout';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAPIContext } from '../../hocs/api';
import {
  checkCardHolder,
  checkCardNumber,
  checkCardValidity,
  checkCardCvc,
  checkPostalCode,
  checkAddressStreet,
  checkAddressNumber,
  checkAddressCity,
  checkAddressState,
  checkPhone,
} from '../../utils/data';
import { updateUserPhone } from '../../utils/outerRequest';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    theme,
  } = useLayoutContext();
  const {
    userInfo,
    updateUserInfoFromRemote,
    encryptPaymentInfo,
  } = useGlobalStateContext();
  const {
    canCall,
  } = useAPIContext();
  const [values, dispatchValues] = useReducer((oldState, { field, value }) => ({
    ...oldState,
    [field]: {
      [field]: () => value,
      cardNumber: () => value.replace(/\D/g, '').substr(0, 19),
      cardValidity: () => value.replace(/\D/g, '').substr(0, 4),
      cardCvc: () => value.replace(/\D/g, '').substr(0, 4),
      postalCode: () => value.replace(/\D/g, '').substr(0, 8),
      addressNumber: () => value.replace(/\D/g, ''),
      addressState: () => value.replace(/\W/g, '').substr(0, 2),
      phone: () => value.replace(/\D/g, '').substr(0, 11),
    }[field](),
  }), {});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [automaticAddress, setAutomaticAddress] = useState(true);
  const cardNumberRef = useRef();
  const cardValidityRef = useRef();
  const cardCvcRef = useRef();
  const postalCodeRef = useRef();
  const addressNumberRef = useRef();
  const addressStreetRef = useRef();
  const addressCityRef = useRef();
  const addressStateRef = useRef();
  const phoneRef = useRef();
  const alreadyHasAddress = useRef(
    userInfo.clientGazeta?.address ||
    userInfo.clientGazeta?.street_number ||
    userInfo.clientGazeta?.city ||
    userInfo.clientGazeta?.state ||
    userInfo.clientGazeta?.zipcode
  ).current;
  const alreadyHasPhone = useRef(userInfo.phone).current;
  const fieldColor = {
    background: theme.inputBackground,
    label: theme.inputTextColor,
    text: theme.inputTextColor,
    subtitle: theme.inputTextColor,
    suffixIcon: theme.primaryColor,
    feedback: {
      success: theme.green__main,
      warning: theme.yellow__main,
      error: theme.red__main,
    },
  };
  const nextField = {
    cardHolder: cardNumberRef,
    cardNumber: cardValidityRef,
    cardValidity: cardCvcRef,
    cardCvc: !alreadyHasAddress ? postalCodeRef : (!alreadyHasPhone ? phoneRef : undefined),
    addressNumber: automaticAddress ? phoneRef : addressStreetRef,
    addressStreet: addressCityRef,
    addressCity: addressStateRef,
    addressState: phoneRef,
  };

  function returnToPreviousScreen() {
    props.navigation.replace('PaymentMethods', props.navigation.state.params);
  }

  function goToPaymentMethodsScreen() {
    props.navigation.replace('PaymentMethods', {
      ...(props.navigation.state.params || {}),
      paymentMethods: undefined,
    });
  }

  function hideFeedBack() {
    setFeedback(false);
  }

  function getInputRef(field) {
    return {
      cardNumber: cardNumberRef,
      cardValidity: cardValidityRef,
      cardCvc: cardCvcRef,
      postalCode: postalCodeRef,
      addressNumber: addressNumberRef,
      addressStreet: addressStreetRef,
      addressCity: addressCityRef,
      addressState: addressStateRef,
      phone: phoneRef,
    }[field];
  }

  function setValuesHOF(field) {
    return function(value) {
      dispatchValues({ field, value });
    }
  }

  function checkErrorHOF(field) {
    let checkError = {
      cardHolder: () => !checkCardHolder(values.cardHolder) && 'invalid',
      cardNumber: () => !checkCardNumber(values.cardNumber) && 'invalid',
      cardValidity: () => !checkCardValidity(values.cardValidity) && 'invalid',
      cardCvc: () => !checkCardCvc(values.cardCvc) && 'invalid',
      postalCode: () => !checkPostalCode(values.postalCode) && 'invalid',
      addressStreet: () => !checkAddressStreet(values.addressStreet) && 'invalid',
      addressNumber: () => !checkAddressNumber(values.addressNumber) && 'invalid',
      addressCity: () => !checkAddressCity(values.addressCity) && 'invalid',
      addressState: () => !checkAddressState(values.addressState) && 'invalid',
      phone: () => !checkPhone(values.phone) && 'invalid',
    }[field];
    return function() {
      let error = checkError();
      setErrors((errors) => ({
        ...errors,
        [field]: error,
      }));
      return error;
    }
  }

  function focusNextFieldHOF(field) {
    if (field === 'postalCode') return getAddressDetails;
    if (field === 'phone') return save;

    if (!nextField[field]?.current) return;

    return function() {
      nextField[field].current.focus();
    }
  }

  async function getAddressDetails() {
    let { postalCode } = values;
    if (postalCode?.length !== 8) return;

    try {
      Keyboard.dismiss();
      setLoading(true);
      let result = await API.call({
        method: 'get',
        baseURL: 'https://viacep.com.br/ws/',
        url: `${postalCode}/json/`,
        timeout: 5000,
      });
      if (result.data.erro) throw null;

      dispatchValues({
        field: 'addressStreet',
        value: result.data.logradouro,
      });
      dispatchValues({
        field: 'addressCity',
        value: result.data.localidade,
      });
      dispatchValues({
        field: 'addressState',
        value: result.data.uf,
      });
    } catch {
      setAutomaticAddress(false);
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    Keyboard.dismiss();
    let errors = [
      'cardHolder',
      'cardNumber',
      'cardValidity',
      'cardCvc',
      ...(alreadyHasAddress ? [] : [
        'addressStreet',
        'addressNumber',
        'addressCity',
        'addressState',
        'postalCode',
      ]),
      ...(alreadyHasPhone ? [] : [
        'phone',
      ]),
    ].map((field) => checkErrorHOF(field)());
    if (errors.some((error) => error !== false)) return;

    if (!canCall) return setFeedback('noInternet');

    try {
      setLoading(true);
      let result = await API.call({
        method: 'post',
        url: '/api/create/userCrediCard',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          data: encryptPaymentInfo({
            card_name: values.cardHolder.toUpperCase(),
            card_number: values.cardNumber,
            card_due_date: values.cardValidity.replace(/^(\d{2})/, '$1/20'),
            card_cvv: values.cardCvc,
          }),
        },
      });
      if (result.status !== 200) {
        setLoading(false);
        setFeedback('any'); // need better usage, if possible
        return;
      }

      if (!alreadyHasAddress) await saveAddress();
      if (!alreadyHasPhone) await savePhone();
      if (!alreadyHasAddress || !alreadyHasPhone) updateUserInfoFromRemote(true);
      setLoading(false);
      setFeedback('success');
    } catch {
      setLoading(false);
      setFeedback('any');
    }
  }

  async function saveAddress() {
    try {
      await API.call({
        method: 'post',
        url: '/api/create/updateAddress',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          address: values.addressStreet,
          street_number: values.addressNumber,
          city: values.addressCity,
          state: values.addressState.toUpperCase(),
          zipcode: values.postalCode,
        },
      });
    } catch {
      //
    }
  }

  async function savePhone() {
    try {
      await updateUserPhone(userInfo.id, userInfo.jwtGazeta, values.phone);
    } catch {
      //
    }
  }

  const value = {
    values,
    loading,
    errors,
    feedback,
    automaticAddress,
    alreadyHasAddress,
    alreadyHasPhone,
    fieldColor,
    returnToPreviousScreen,
    goToPaymentMethodsScreen,
    hideFeedBack,
    getInputRef,
    setValuesHOF,
    checkErrorHOF,
    focusNextFieldHOF,
    save,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
