import React, {
  createContext,
  useContext as useReactContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Keyboard, Platform, Linking } from 'react-native';
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import FBSDK, { AppEventsLogger } from 'react-native-fbsdk';
import analytics from '@react-native-firebase/analytics';
import { appleAuth } from '@invertase/react-native-apple-authentication';

import API from '../../helpers/api';
import GraphQL from '../../helpers/graphql';
import GraphQLEmpresas from '../../helpers/graphqlEmpresasApi';
import database from '../../helpers/database';
import { checkEmail, checkDoc } from '../../utils/data';
import { useLayoutContext } from '../../hocs/layout';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAnalyticsContext } from '../../hocs/analytics';
import { APP_DISTRO } from '../../constants/app';
import { CORE_URL } from '../../constants/env';
import axios from 'axios';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const { LoginManager, GraphRequest, GraphRequestManager } = FBSDK;

const Provider = props => {
  const { DATABASE_APP_THEME_KEY, palette, loadTheme, removeTheme } =
    useLayoutContext();
  const screenPalette = palette.sign_in;
  const { updateUserInfo, showCompleteProfileModal } = useGlobalStateContext();
  const { dispatchRecord } = useAnalyticsContext();
  const passwordFieldRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [situation, setSituation] = useState(0);
  const [staticTheme, setStaticTheme] = useState(null);

  useEffect(() => {
    analytics().logEvent('Login_Navegacao');
    AppEventsLogger.logEvent('Login_Navegacao', {});
  }, []);

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }

  function handleSignUp() {
    props.navigation.navigate('SignUp');
  }

  function hideFeedback() {
    setPassword('');
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
  const checkUsernameError = checkError(
    'username',
    () => username === '' && 'invalid',
  );
  const checkPasswordError = checkError(
    'password',
    () => !password.trim() && 'invalid',
  );

  const loginSocial = async (network, id, name, photo, email) => {
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
      await loadTheme((result.data.subscriptions || [])[0]?.offerId);
      await database.set('user-info', JSON.stringify(result.data));
      if (!result.data.email) {
        showCompleteProfileModal();
      }
      setLoading(false);
      updateUserInfo();
      analytics().logEvent('Login_Sucesso');
      AppEventsLogger.logEvent('Login_Sucesso', {});
      let { hasClub } = (result.data.subscriptions || [])[0] || {};
      props.navigation.navigate(hasClub ? 'OnBoarding' : 'Payment');
    } else {
      analytics().logEvent('Login_RequerCadastroSocial');
      AppEventsLogger.logEvent('Login_RequerCadastroSocial', {});
      props.navigation.navigate('SignUpSocial', {
        id: id,
        name: name,
        network: network,
        photo: photo,
        email: email,
      });
      setLoading(false);
    }
  };
  async function _responseInfoCallbackFacebook(error, result) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      loginSocial(
        'facebook',
        result.id,
        result.name,
        `https://graph.facebook.com/${result.id}/picture?type=large`,
        '',
      );
    }
  }

  function signInWithFacebook() {
    dispatchRecord('Entrar', {
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
        alert('Erro na autênticação com rede social' + JSON.stringify(error));
      },
    );
  }

  // const signInWithGoogle = async () => {
  //   dispatchRecord('Entrar', {
  //     value: 'Google',
  //   });
  //   try {
  //     GoogleSignin.configure({
  //       scopes: [], // what API you want to access on behalf of the user, default is email and profile
  //       webClientId:
  //         '905243245500-3v9ojn912b6na48bv2r2ogm78b62ivs8.apps.googleusercontent.com',
  //       androidClientId:
  //         '905243245500-0m89sr196ej0fdbgntha4hqtp2f0m11b.apps.googleusercontent.com',
  //       iosClientId:
  //         '905243245500-h5jijmjvvgqqc3chhamt15qo75h3nneu.apps.googleusercontent.com',
  //       offlineAccess: true,
  //       forceConsentPrompt: true,
  //     });
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('Aqui ');
  //     loginSocial(
  //       'google',
  //       userInfo.user.id,
  //       userInfo.user.name,
  //       userInfo.user.photo,
  //       userInfo.user.email,
  //     );
  //   } catch (error) {
  //     console.log('Não foi' + JSON.stringify(error));
  //     console.log(error.code);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  async function signInWithApple() {
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
    loginSocial(
      'apple',
      request.user,
      [
        request.fullName.givenName,
        request.fullName.middleName,
        request.fullName.familyName,
      ]
        .filter(Boolean)
        .join(' '),
      '',
      request.email,
    );
  }

  function focusPasswordField() {
    passwordFieldRef.current.focus();
  }

  async function getUserZet(cpf) {
    try {
      let result = await GraphQL({
        query: `query Query($cpf: String!) {
          getUserZet(cpf: $cpf)
        }`,
        variables: {
          cpf: String(cpf),
        },
      });
      if (result.status !== 200) {
        throw [];
      }

      return result.data.data.getUserZet
    } catch (e) {
      return [];
    }
  }

  async function getUserNotLogan(matricula){
    try {
      let result = await GraphQLEmpresas({
        query: `query Query($registrationNumber: String!){
          verifyEmployeeLoganIntegration(registrationNumber: $registrationNumber){
            id
            registrationNumber
            whiteLabelId
            offerId
            situation
          }
        }`,
        variables: {
          registrationNumber: String(matricula),
        },
      });
      if (result.status !== 200) {
        throw [];
      }
      if (result?.data?.errors?.length > 0) {
        throw [];
      }

      return result.data.data.verifyEmployeeLoganIntegration
    } catch (e) {
      return [];
    }
  }



  async function signIn() {
    Keyboard.dismiss();
    let errors = [checkUsernameError(), checkPasswordError()];
    if (errors.some(error => error !== false)) {
      return;
    }

    try {
      dispatchRecord('Entrar', {
        value: 'Regular',
      });
      setLoading(true);
      let result = await API.call({
        method: 'post',
        url: '/api/login',
        data: {
          username,
          password,
          appDistro: APP_DISTRO,
        },
      });

      if (result.status === 200) {
        if (!result.data.subscriptions || result.data.subscriptions.length === 0) {
          const validUserZet = await getUserZet(username);
          if (validUserZet) {
            await loadTheme((result.data.subscriptions || [])[0]?.offerId);
            await database.set('user-info', JSON.stringify(result.data));
            setLoading(false);
            updateUserInfo();
            analytics().logEvent('Login_Sucesso');
            AppEventsLogger.logEvent('Login_Sucesso', {});
            props.navigation.navigate('OnBoarding');
          } else {
            await loadTheme((result.data.subscriptions || [])[0]?.offerId);
            await database.set('user-info', JSON.stringify(result.data));
            setLoading(false);
            updateUserInfo();
            props.navigation.navigate('Payment');
          }
        } else {
          await loadTheme((result.data.subscriptions || [])[0]?.offerId);
          await database.set('user-info', JSON.stringify(result.data));
          setLoading(false);
          if (!result.data.email) {
            showCompleteProfileModal();
          }
          updateUserInfo();
          analytics().logEvent('Login_Sucesso');
          AppEventsLogger.logEvent('Login_Sucesso', {});
          let { hasClub } = (result.data.subscriptions || [])[0] || {};
          props.navigation.navigate(hasClub ? 'OnBoarding' : 'Payment');
        }
      } 
      else if (result.status === 401) {
        const userLogan = await getUserNotLogan(username);
        setLoading(false);

        if(userLogan.length == 0){
          setLoading(false);
          setFeedback('wrong');
          analytics().logEvent('Login_Erro');
          AppEventsLogger.logEvent('Login_Erro', {});
        }else{
          props.navigation.navigate('CompleteRegistration', {registrationNumber: username});
        }
      }
      else {
        setLoading(false);
        setFeedback('wrong');
        analytics().logEvent('Login_Erro');
        AppEventsLogger.logEvent('Login_Erro', {});
      }
    } catch (e) {
      console.log('e', e);
      setFeedback('any');
      setLoading(false);
    }
  }

  function goToForgotPasswordScreen() {
    props.navigation.navigate('ForgetPassword');
  }

  function goToSignUpScreen() {
    props.navigation.navigate('SignUp');
    // Linking.openURL('https://clube.gazetadopovo.com.br/assine/?offerId=3c59dc048e8850243be8079a5c74d079&utm_source=app&utm_medium=redirect&utm_campaign=clube_app').catch(() => {});
  }

  const value = {
    screenPalette,
    passwordFieldRef,
    username,
    setUsername,
    password,
    setPassword,
    errors,
    loading,
    feedback,
    staticTheme,
    returnToPreviousScreen,
    hideFeedback,
    openStore,
    checkUsernameError,
    checkPasswordError,
    signInWithFacebook,
    // signInWithGoogle,
    signInWithApple,
    focusPasswordField,
    signIn,
    handleSignUp,
    goToForgotPasswordScreen,
    goToSignUpScreen,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
