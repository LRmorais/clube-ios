import React, {
  createContext,
  useContext as useReactContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import {Keyboard, Linking, Platform} from 'react-native';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import FBSDK, {AppEventsLogger} from 'react-native-fbsdk';
import analytics from '@react-native-firebase/analytics';
import {appleAuth} from '@invertase/react-native-apple-authentication';

import database from '../../helpers/database';
import API from '../../helpers/api';
import {
  checkDoc,
  checkEmail,
  checkPhone,
  checkPassword,
} from '../../utils/data';
import {saveUserToLogan} from '../../utils/outerRequest';
import {useLayoutContext} from '../../hocs/layout';
import {useGlobalStateContext} from '../../hocs/globalState';
import {useAnalyticsContext} from '../../hocs/analytics';
import {associateSocialNetwork} from '../../utils/outerRequest';
import {APP_DISTRO} from '../../constants/app';

const Context = createContext();
export const useContext = () => useReactContext(Context);
const {LoginManager, GraphRequest, GraphRequestManager} = FBSDK;

const Provider = props => {
  const {palette, loadTheme} = useLayoutContext();
  const screenPalette = palette.sign_up;
  const {setNextProgressPayload, updateUserInfo, showCompleteProfileModal} =
    useGlobalStateContext();
  const {dispatchRecord} = useAnalyticsContext();

  const docNumberFieldRef = useRef();
  const emailFieldRef = useRef();
  const phoneFieldRef = useRef();
  const passwordFieldRef = useRef();

  const [socialName, setSocialName] = useState(
    props.navigation.getParam('name', ''),
  );
  const [socialPhoto, setSocialPhoto] = useState(
    props.navigation.getParam('photo', null),
  );
  const [socialNetwork, setSocialNetwork] = useState(
    props.navigation.getParam('network', null),
  );
  const [idSocial, setIdSocial] = useState(
    props.navigation.getParam('idSocial', null),
  );
  const [emailSocial, setEmailSocial] = useState(
    props.navigation.getParam('email', ''),
  );
  const [phoneSocial, setPhoneSocial] = useState(
    props.navigation.getParam('phone', ''),
  );
  const [cpfSocial, setCpfSocial] = useState(
    props.navigation.getParam('cpfSocial', ''),
  );

  const [fullName, setFullName] = useState(socialName);
  const [docNumber, setDocNumber] = useState(cpfSocial);
  const [email, setEmail] = useState(emailSocial);
  const [phone, setPhone] = useState(emailSocial);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [staticTheme, setStaticTheme] = useState(null);

  useEffect(() => {
    analytics().logEvent('Cadastro_Navegacao');
    AppEventsLogger.logEvent('Cadastro_Navegacao', {});
  }, []);

  useEffect(() => {
    if (!fullName && !docNumber && !email && !phone) {
      return;
    }

    setNextProgressPayload({
      step: 'Preenchendo cadastro',
      name: fullName,
      document: docNumber,
      email: email,
      phone,
    });
  }, [fullName, docNumber, email]);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function hideFeedback() {
    setFeedback(false);
  }

  function openStore() {
    try {
      let link = {
        android:
          'https://play.google.com/store/apps/details?id=br.com.gazetadopovo.clubegazetaempresas&hl=pt_BR',
        ios: 'https://apps.apple.com/br/app/clube-gazeta-empresas/id1500307327',
      }[Platform.OS];
      Linking.openURL(link);
    } catch {
      //
    }
  }

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
  const checkFullNameError = checkError(
    'fullName',
    () => !fullName.trim() && 'invalid',
  );
  const checkDocNumberError = checkError(
    'docNumber',
    () => !checkDoc(docNumber.replace(/\D/g, '')) && 'invalid',
  );
  const checkEmailError = checkError(
    'email',
    () => !checkEmail(email) && 'invalid',
  );
  const checkPhoneError = checkError(
    'phone',
    () => !checkPhone(phone) && 'invalid',
  );
  const checkPasswordError = checkError(
    'password',
    () => !checkPassword(password) && 'invalid',
  );

  async function signIn(username, password) {
    try {
      let result = await API.call({
        method: 'post',
        url: '/api/login',
        data: {
          username,
          password,
          appDistro: APP_DISTRO,
        },
      });
      await Promise.all([
        database.set('user-info', JSON.stringify(result.data)),
        loadTheme((result.data.subscriptions || [])[0]?.offerId),
      ]);
      if (!result.data.email) {
        showCompleteProfileModal();
      }
      updateUserInfo();

      if (idSocial != null) {
        await associateSocialNetwork(
          result.data.id,
          socialName,
          socialPhoto,
          socialNetwork,
          idSocial,
          result.data.jwtGazeta,
        );
      }
    } catch {
      //
    }
  }

  async function signUp() {
    Keyboard.dismiss();

    let errors = [
      checkFullNameError(),
      checkDocNumberError(),
      checkEmailError(),
      checkPhoneError(),
      checkPasswordError(),
    ];
    if (errors.some(error => error !== false)) {
      return;
    }

    try {
      dispatchRecord('Cadastrar', {
        value: 'Regular',
      });
      setLoading(true);
      await saveUserToLogan({
        fullName,
        docNumber,
        email,
        phone,
        password,
      });
      setLoading(false);
      signIn(email, password); // not awaiting because isn't necessary
      setNextProgressPayload({
        step: 'Cadastrado com sucesso',
        name: fullName,
        document: docNumber,
        email: email,
        phone,
      });
      analytics().logEvent('Cadastro_Sucesso');
      AppEventsLogger.logEvent('Cadastro_Sucesso', {});
      props.navigation.navigate('Payment');
    } catch (err) {
      setLoading(false);
      let errMessage = err?.response?.data?.errors?.[0]?.message;
      let fn = {
        'cpf must be unique'() {
          setErrors(errors => ({
            ...errors,
            docNumber: 'repeated',
          }));
        },
        'cpf must be a valid CPF Number'() {
          setErrors(errors => ({
            ...errors,
            docNumber: 'invalid',
          }));
        },
        'E-mail must be valid'() {
          setErrors(errors => ({
            ...errors,
            email: 'invalid',
          }));
        },
      }[errMessage];
      if (!fn) {
        return setFeedback('any');
      }
      fn();
      analytics().logEvent('Cadastro_Erro');
      AppEventsLogger.logEvent('Cadastro_Erro', {});
    }
  }

  const loginSocial = async (network, id) => {
    setLoading(true);
    let result = await API.call({
      method: 'post',
      url: '/api/login',
      data: {
        network: network,
        socialId: id,
        appDistro: APP_DISTRO,
      },
    });
    if (result.status === 200) {
      let loadedTheme = await loadTheme(
        (result.data.subscriptions || [])[0]?.offerId,
      );
      if (loadedTheme) {
        await database
          .get(DATABASE_APP_THEME_KEY)
          .then(JSON.parse)
          .then(setStaticTheme);
        setLoading(false);
        setFeedback('wrongApp');
        removeTheme();
        return;
      }
      await database.set('user-info', JSON.stringify(result.data));

      if (!result.data.email) {
        showCompleteProfileModal();
      }
      updateUserInfo();
      let {hasClub} = (result.data.subscriptions || [])[0] || {};
      props.navigation.navigate(hasClub ? 'OnBoarding' : 'Payment');
    }
    setLoading(false);
  };

  async function _responseInfoCallbackFacebook(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      setSocialName(result.name);
      setFullName(result.name);
      setSocialNetwork('facebook');
      setIdSocial(result.id);
      setSocialPhoto(
        `https://graph.facebook.com/${idSocial}/picture?type=large`,
      );
      loginSocial('facebook', result.id);
    }
  }

  function signUpWithFacebook() {
    dispatchRecord('Cadastrar', {
      value: 'Facebook',
    });
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login was cancelled');
        } else {
          const infoRequest = new GraphRequest(
            '/me',
            null,
            _responseInfoCallbackFacebook,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function (error) {
        console.log(
          'Erro na autênticação com rede social' + JSON.stringify(error),
        );
      },
    );
  }

  const signUpWithGoogle = async () => {
    dispatchRecord('Cadastrar', {
      value: 'Google',
    });
    try {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId:
          '905243245500-3v9ojn912b6na48bv2r2ogm78b62ivs8.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        //hostedDomain: '', // specifies a hosted domain restriction
        //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
        //accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId:
          '905243245500-h5jijmjvvgqqc3chhamt15qo75h3nneu.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setSocialName(userInfo.user.name);
      setFullName(userInfo.user.name);
      setSocialNetwork('google');
      setIdSocial(userInfo.user.id);
      setEmailSocial(userInfo.user.email);
      setEmail(userInfo.user.email);
      setSocialPhoto(userInfo.user.photo);
      loginSocial('google', userInfo.user.id);
    } catch (error) {
      console.log('Não foi' + JSON.stringify(error));
      console.log(error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function signUpWithApple() {
    dispatchRecord('Entrar', {
      value: 'Apple',
    });

    let request = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    let credential = await appleAuth.getCredentialStateForUser(request.user);
    if (credential !== appleAuth.State.AUTHORIZED) {
      return;
    }

    let name = [
      request.fullName.givenName,
      request.fullName.middleName,
      request.fullName.familyName,
    ]
      .filter(Boolean)
      .join(' ');
    setSocialName(name);
    setFullName(name);
    setSocialNetwork('apple');
    setIdSocial(request.user);
    setEmailSocial(request.email);
    setEmail(request.email);
    setSocialPhoto('');
    loginSocial('apple', request.user);
  }

  function focusDocNumberField() {
    docNumberFieldRef.current.focus();
  }

  function focusEmailField() {
    emailFieldRef.current.focus();
  }

  function focusPhoneField() {
    phoneFieldRef.current.focus();
  }

  function focusPasswordField() {
    passwordFieldRef.current.focus();
  }

  function goToSignInScreen() {
    props.navigation.navigate('SignIn');
  }

  const value = {
    screenPalette,
    docNumberFieldRef,
    emailFieldRef,
    phoneFieldRef,
    passwordFieldRef,
    fullName,
    setFullName,
    docNumber,
    setDocNumber,
    email,
    setEmail,
    phone,
    setPhone,
    password,
    setPassword,
    loading,
    feedback,
    staticTheme,
    errors,
    checkFullNameError,
    checkDocNumberError,
    checkEmailError,
    checkPhoneError,
    checkPasswordError,
    returnToPreviousScreen,
    hideFeedback,
    openStore,
    signUp,
    signUpWithFacebook,
    signUpWithGoogle,
    signUpWithApple,
    focusDocNumberField,
    focusEmailField,
    focusPhoneField,
    focusPasswordField,
    goToSignInScreen,
    socialName,
    // socialPhoto,
    // socialNetwork,
    idSocial,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
