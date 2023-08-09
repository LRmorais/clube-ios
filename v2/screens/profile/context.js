import React, { createContext, useContext as useReactContext, useState, useReducer, useRef } from 'react';
import { Keyboard } from 'react-native';

import API from '../../helpers/api';
import { useLayoutContext } from '../../hocs/layout';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAPIContext } from '../../hocs/api';
import {
  checkEmail,
  checkPhone,
  checkBirthday,
  checkPostalCode,
  checkAddressStreet,
  checkAddressNumber,
  checkAddressCity,
  checkAddressState,
  maskDoc,
} from '../../utils/data';
import {
  updateUserPhone,
  updateUserEmail,
  updateUserInfo,
} from '../../utils/outerRequest';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    theme,
  } = useLayoutContext();
  const {
    userInfo,
    updateUserInfoFromRemote,
  } = useGlobalStateContext();
  const {
    canCall,
  } = useAPIContext();
  const [values, dispatchValues] = useReducer((oldState, { field, value }) => ({
    ...oldState,
    [field]: {
      [field]: () => value,
      phone: () => value.replace(/\D/g, '').substr(0, 11),
      birthday: () => value.replace(/[^\d\/]/g, '').substr(0, 10),
      postalCode: () => value.replace(/\D/g, '').substr(0, 8),
      addressNumber: () => value.replace(/\D/g, ''),
      addressState: () => value.replace(/\W/g, '').substr(0, 2),
    }[field](),
  }), {
    name: userInfo.name || '',
    doc: maskDoc(userInfo.cpf) || '',
    email: userInfo.email || '',
    phone: userInfo.phone.replace(/\D/g, '') || '',
    birthday: userInfo.birthday?.split('-')?.reverse()?.join('/') || '',
    genre: userInfo.genre || '',
    postalCode: userInfo.clientGazeta.zipcode?.replace(/\D/g, '') || '',
    addressStreet: userInfo.clientGazeta.address || '',
    addressNumber: userInfo.clientGazeta.street_number || '',
    addressCity: userInfo.clientGazeta.city || '',
    addressState: userInfo.clientGazeta.state || '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [automaticAddress, setAutomaticAddress] = useState(true);
  const emailRef = useRef();
  const phoneRef = useRef();
  const birthdayRef = useRef();
  const postalCodeRef = useRef();
  const addressNumberRef = useRef();
  const addressStreetRef = useRef();
  const addressCityRef = useRef();
  const addressStateRef = useRef();
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
  const radioColor = {
    label: theme.inputTextColor,
    default: theme.primaryColor,
    innerBall: theme.primaryColor,
    text: theme.inputTextColor,
  };
  const nextField = {
    name: emailRef,
    email: phoneRef,
    phone: birthdayRef,
    birthday: postalCodeRef,
    postalCode: addressNumberRef,
    addressNumber: automaticAddress ? undefined : addressStreetRef,
    addressStreet: addressCityRef,
    addressCity: addressStateRef,
  };

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function hideFeedBack() {
    setFeedback(false);
  }

  function getInputRef(field) {
    return {
      email: emailRef,
      phone: phoneRef,
      birthday: birthdayRef,
      postalCode: postalCodeRef,
      addressNumber: addressNumberRef,
      addressStreet: addressStreetRef,
      addressCity: addressCityRef,
      addressState: addressStateRef,
    }[field];
  }

  function setValuesHOF(field) {
    return function(value) {
      dispatchValues({ field, value });
    }
  }

  function checkErrorHOF(field) {
    let checkError = {
      name: () => !values.name.trim() && 'invalid',
      email: () => !checkEmail(values.email) && 'invalid',
      phone: () => !checkPhone(values.phone) && 'invalid',
      birthday: () => !!values.birthday.trim() && !checkBirthday(values.birthday) && 'invalid',
      postalCode: () => !!values.postalCode.trim() && !checkPostalCode(values.postalCode) && 'invalid',
      addressStreet: () => !!values.addressStreet.trim() && !checkAddressStreet(values.addressStreet) && 'invalid',
      addressNumber: () => !!values.addressNumber.trim() && !checkAddressNumber(values.addressNumber) && 'invalid',
      addressCity: () => !!values.addressCity.trim() && !checkAddressCity(values.addressCity) && 'invalid',
      addressState: () => !!values.addressState.trim() && !checkAddressState(values.addressState) && 'invalid',
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
    if (field === 'addressState') return save;

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
      'name',
      'email',
      'phone',
      'birthday',
      'addressStreet',
      'addressNumber',
      'addressCity',
      'addressState',
      'postalCode',
    ].map((field) => checkErrorHOF(field)());
    if (errors.some((error) => error !== false)) return;

    if (!canCall) return setFeedback('noInternet');

    try {
      setLoading(true);
      await Promise.all([
        saveAddress(),
        userInfo.phone !== values.phone && savePhone(),
        userInfo.email !== values.email && saveEmail(),
        saveInfo(),
      ]);
      updateUserInfoFromRemote(true);
      setLoading(false);
      setFeedback('success');
    } catch (e) {
      setLoading(false);
      setFeedback(typeof e === 'string' ? e : 'any');
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
      throw 'address';
    }
  }

  async function savePhone() {
    try {
      await updateUserPhone(userInfo.id, userInfo.jwtGazeta, values.phone);
    } catch {
      throw 'phone';
    }
  }

  async function saveEmail() {
    try {
      await updateUserEmail(userInfo.id, userInfo.jwtGazeta, values.email);
    } catch {
      throw 'email';
    }
  }

  async function saveInfo() {
    try {
      await updateUserInfo(userInfo.id, userInfo.jwtGazeta, {
        name: values.name,
        birthday: values.birthday.split('/').reverse().join('-'),
        genre: values.genre || null,
      });
    } catch {
      throw 'info';
    }
  }

  const value = {
    values,
    loading,
    errors,
    feedback,
    automaticAddress,
    fieldColor,
    radioColor,
    returnToPreviousScreen,
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
