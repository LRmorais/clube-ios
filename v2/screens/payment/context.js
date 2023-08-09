import React, { createContext, useContext as useReactContext, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Keyboard } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from 'react-native-fbsdk';

import Recaptcha from '../../components/recaptcha';
import API from '../../helpers/api';
import { checkCardNumber, checkCardValidity, checkCardCvc, getCardBanner } from '../../utils/data';
import { paySubscriptionOnLogan } from '../../utils/outerRequest';
import showOptionsMenu from '../../helpers/optionsMenu';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useLayoutContext } from '../../hocs/layout';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = (props) => {
  const {
    userInfo,
    setNextProgressPayload,
    updateUserInfoFromRemote,
    removeUserInfo,
  } = useGlobalStateContext();

  const {
    palette,
  } = useLayoutContext();
  const screenPalette = palette.payment;

  const [offers, setOffers] = useState(null);
  const cardHolderRef = useRef();
  const cardValidityRef = useRef();
  const cardCvcRef = useRef();
  const [offer, setOffer] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardValidity, setCardValidity] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [recaptcha, setRecaptcha] = useState(null);
  const [recaptchaKey, setRecaptchaKey] = useState("");
  const iconRef = useRef();

  useLayoutEffect(() => {
    analytics().logEvent('Pagamento_Navegacao');
    AppEventsLogger.logEvent('Pagamento_Navegacao', {});
    getOffers();
  }, []);

  useEffect(() => {
    if (!offers) return;

    checkOfferError();
  }, [offer]);

  useEffect(() => {
    if (loading && recaptcha) finishSubscription();
  }, [recaptcha]);

  async function getOffers() {
    let netState = await NetInfo.fetch();
    if (!netState.isConnected || !netState.isInternetReachable) {
      setOffers({ error: 'unconnected' });
      return;
    }
    try {
      setLoadingOffers(true);
      let result = await API.call({
        method: 'get',
        url: '/api/repository/config',
      });
      let { offers } = ((result.data || {}).app || {});
      setOffers(offers || { error: 'unknown' });
    } catch {
      setOffers({ error: 'unknown' });
    } finally {
      setLoadingOffers(false);
    }
  }

  function checkError(fieldName, fn) {
    return function () {
      let error = fn();
      setErrors((errors) => ({
        ...errors,
        [fieldName]: error,
      }));
      return error;
    }
  }
  const checkOfferError = checkError('offer', () => offer === null && 'unselected');
  const checkCardNumberError = checkError('cardNumber', () => !checkCardNumber(cardNumber.replace(/\D/g, '')) && 'invalid');
  const checkCardHolderError = checkError('cardHolder', () => !cardHolder.trim() && 'invalid');
  const checkCardValidityError = checkError('cardValidity', () => !checkCardValidity(cardValidity) && 'invalid');
  const checkCardCvcError = checkError('cardCvc', () => !checkCardCvc(cardCvc) && 'invalid');

  function focusCardHolderField() {
    cardHolderRef.current.focus();
  }

  function focusCardValidityField() {
    cardValidityRef.current.focus();
  }

  function focusCardCvcField() {
    cardCvcRef.current.focus();
  }

  async function paySubscription() {
    if (loading) return;

    Keyboard.dismiss();

    if (!offers) return;
    if (offers && offers.error) return;

    let errors = [
      checkOfferError(),
      checkCardNumberError(),
      checkCardHolderError(),
      checkCardValidityError(),
      checkCardCvcError(),
    ];
    if (errors.some((error) => error !== false)) return;

    setLoading(true);
    setRecaptchaKey(String(+recaptchaKey + 1))
  }

  async function finishSubscription() {
    try {
      await paySubscriptionOnLogan({
        token: userInfo.jwtGazeta,
        recaptcha,
        offer,
        cardBanner: getCardBanner(cardNumber),
        cardNumber,
        cardHolder,
        cardValidity,
        cardCvc,
      });
      await updateUserInfoFromRemote(true);
      setLoading(false);
      setFeedback('success');
      setNextProgressPayload({
        step: 'Pago com sucesso',
      });
      analytics().logEvent('Pagamento_Sucesso');
      AppEventsLogger.logEvent('Pagamento_Sucesso', {});
    } catch {
      setFeedback('error');
      setLoading(false);
      analytics().logEvent('Pagamento_Erro');
      AppEventsLogger.logEvent('Pagamento_Erro', {});
    }
  }

  function hideFeedback() {
    setFeedback(null);
  }

  function goToOnBoardingScreen() {
    props.navigation.navigate('OnBoarding');
  }

  function logOut() {
    removeUserInfo();
    props.navigation.navigate('AuthSwitch');
  }

  function showOptions() {
    showOptionsMenu(
      [
        ['Sair', logOut],
      ],
      iconRef.current
    );
  }

  const value = {
    screenPalette,
    offers,
    cardHolderRef,
    cardValidityRef,
    cardCvcRef,
    offer,
    setOffer,
    cardNumber,
    setCardNumber,
    cardHolder,
    setCardHolder,
    cardValidity,
    setCardValidity,
    cardCvc,
    setCardCvc,
    errors,
    loading,
    loadingOffers,
    feedback,
    iconRef,
    getOffers,
    checkCardNumberError,
    checkCardHolderError,
    checkCardValidityError,
    checkCardCvcError,
    focusCardHolderField,
    focusCardValidityField,
    focusCardCvcField,
    paySubscription,
    hideFeedback,
    goToOnBoardingScreen,
    showOptions,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
      <Recaptcha
        executeKey={recaptchaKey}
        onToken={setRecaptcha}
      />
    </Context.Provider>
  );
};

export default Provider;
