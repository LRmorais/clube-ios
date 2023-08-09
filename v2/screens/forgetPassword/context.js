import React, {
  createContext,
  useContext as useReactContext,
  useRef,
  useState,
} from 'react';
import {useLayoutContext} from '../../hocs/layout';
import API from '../../helpers/api';
import {checkCPF, associateSocialNetwork} from '../../utils/outerRequest';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import {checkEmail} from '../../utils/data';

const Context = createContext();

export const useContext = () => useReactContext(Context);
const Provider = props => {
  const {palette} = useLayoutContext();
  const screenPalette = palette.forget_password;
  const {dispatchRecord} = useAnalyticsContext();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);

  const returnToPreviousScreen = () => {
    props.navigation.goBack();
  };

  function checkError(fieldName, fn) {
    return function () {
      let error = fn();
      setErrors(errors => ({
        ...errors,
        [fieldName]: error,
      }));

      return error;
    };
  }
  const checkEmailError = checkError(
    'email',
    () => !checkEmail(email) && 'invalid',
  );

  const handleSubmitEditing = async () => {
    continueAction();
  };

  const continueAction = async () => {
    let errors = [checkEmailError()];
    if (errors.some(error => error !== false)) {
      return;
    }
    dispatchRecord('Recuperar senha', {
      value: email,
    });
    setLoading(true);
    await API.call({
      method: 'post',
      url: '/api/forgetpassword/email',
      data: {
        email,
      },
    });

    setLoading(false);
    setFeedback('finish');
  };

  const setEmailField = async email => {
    setEmail(email);
  };

  function hideFeedback() {
    setEmail('');
    setFeedback(false);
    props.navigation.goBack();
  }

  const value = {
    screenPalette,
    errors,
    returnToPreviousScreen,
    continueAction,
    hideFeedback,
    loading,
    feedback,
    email,
    setEmailField,
    handleSubmitEditing,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
export default Provider;
