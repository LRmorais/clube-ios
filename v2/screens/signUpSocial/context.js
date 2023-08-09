import React, { createContext, useContext as useReactContext, useRef, useState, useEffect } from 'react';
import analytics from '@react-native-firebase/analytics';
import { AppEventsLogger } from 'react-native-fbsdk';

import { useLayoutContext } from '../../hocs/layout';
import API from '../../helpers/api';
import {checkCPF, associateSocialNetwork} from '../../utils/outerRequest'
import { useGlobalStateContext } from '../../hocs/globalState';
import database from '../../helpers/database';
import { checkDoc } from '../../utils/data';
import { APP_DISTRO } from '../../constants/app';

const Context = createContext();



export const useContext = () => useReactContext(Context);
const Provider = (props) => {
  const {
    setNextProgressPayload,
    updateUserInfo,
    showCompleteProfileModal,
  } = useGlobalStateContext();
  const {
    palette,
    loadTheme,
  } = useLayoutContext();
  const screenPalette = palette.sign_up;
  const name = props.navigation.getParam('name', '-')
  const idSocial = props.navigation.getParam('id', '-')
  const network = props.navigation.getParam('network', '-')
  const email = props.navigation.getParam('email', '')
  const photo = props.navigation.getParam('photo', '')

  const [dataUser, setDataUser] = useState({cpf: '', name: '', password:'',});

  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [action, setAction] = useState(1);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [staticTheme, setStaticTheme] = useState(null);

  useEffect(() => {
    analytics().logEvent('CadastroSocial_Navegacao');
    AppEventsLogger.logEvent('CadastroSocial_Navegacao', {});
  }, []);

  useEffect(() => {
    if (!dataUser?.cpf) return;

    setNextProgressPayload({
      step: 'Preenchendo cadastro social',
      name,
      document: dataUser?.cpf,
      email,
    });
  }, [dataUser?.cpf]);

  const  returnToPreviousScreen = () =>{
    props.navigation.goBack();
  }

  const clearNumber = (text) =>{
      return text.replace(/\D/g, '');
  }

  function checkError(fieldName, fn) {
    return function() {
      let error = fn();
      setErrors((errors) => ({
        ...errors,
        [fieldName]: error,
      }));

      return error;
    }
  }
  const checkCPFError = checkError('cpf', () => !checkDoc(dataUser.cpf.replace(/\D/g, '')) && 'invalid' );
  const checkPassowordError = checkError('password', () => !dataUser.password.trim() && 'invalid');



  function openStore() {
    try {
      let link = {
        android: 'https://play.google.com/store/apps/details?id=br.com.gazetadopovo.clubegazetaempresas&hl=pt_BR',
        ios: 'https://apps.apple.com/br/app/clube-gazeta-empresas/id1500307327',
      }[Platform.OS];
      Linking.openURL(link);
    } catch {
      //
    }
  }
  const continueAction = async () =>{

      if(action == 1){
          let errors = [
            checkCPFError(),
          ];
          if (errors.some((error) => error !== false)) return;
          setLoading(true)

          let result = await checkCPF(clearNumber(dataUser.cpf));
          if(result.data.users.length > 0){
                setAction(2)
                setLoading(false)
          }else{
              // O CPF não existe na gazeta
              setLoading(false)
              props.navigation.navigate(
                 'SignUp', {
                                name,
                                photo: (network == "facebook" ?  `https://graph.facebook.com/${idSocial}/picture?type=large` : photo),
                                network,
                                idSocial,
                                cpfSocial: dataUser.cpf,
                                email,
                           }
                );
          }
      }else if (action == 2){
        // Autênticar e associar rede social na gazeta
        let errors = [
          checkPassowordError(),
        ];
        if (errors.some((error) => error !== false)) return;

          setLoading(true)


          try {
          setLoading(true);
          let result = await API.call({
          method: 'post',
          url: '/api/login',
          data: {
            username: clearNumber(dataUser.cpf),
            password: dataUser.password,
            appDistro: APP_DISTRO,
          },
          });
          if (result.status === 200) {
            let loadedTheme = await loadTheme((result.data.subscriptions || [])[0]?.offerId);
            if (loadedTheme) {
              await database.get(DATABASE_APP_THEME_KEY)
                .then(JSON.parse)
                .then(setStaticTheme);
              setLoading(false);
              setFeedback('wrongApp');
              removeTheme();
              return;
            }
            await database.set('user-info', JSON.stringify(result.data));

            if (!result.data.email) showCompleteProfileModal();
            updateUserInfo();
            let { hasClub } = ((result.data.subscriptions || [])[0] || {});

            await associateSocialNetwork(result.data.id, name, (network == "facebook" ?  `https://graph.facebook.com/${idSocial}/picture?type=large` : photo), network, idSocial, result.data.jwtGazeta);

            setLoading(false);
            if (!hasClub) setNextProgressPayload({
              step: 'Cadastro social realizado com sucesso',
              name,
              document: dataUser?.cpf,
              email,
            });
            analytics().logEvent('CadastroSocial_Sucesso');
            AppEventsLogger.logEvent('CadastroSocial_Sucesso', {});
            props.navigation.navigate(
              hasClub
                ? 'OnBoarding'
                : 'Payment'
              );
          } else {
            setLoading(false);
            setFeedback('wrong');
            analytics().logEvent('CadastroSocial_Erro');
            AppEventsLogger.logEvent('CadastroSocial_Erro', {});
          }
          } catch {
            setFeedback('any');
            setLoading(false);
          }
    }
  }

  const setCPFField = async(cpf) =>{
    setDataUser({...dataUser, cpf: cpf})
  }

  const setPasswordField = (password) =>{
    setDataUser({...dataUser, password: password})
  }

  function hideFeedback() {
    setPassword('');
    setFeedback(false);
  }

  const  goToForgotPasswordScreen = () => {
    props.navigation.navigate('ForgetPassword');
  }

  const value = {
      screenPalette,
      errors,
      name,
      email,
      photo,
      setPasswordField,
      setCPFField,
      action,
      returnToPreviousScreen,
      openStore,
      continueAction,
      dataUser,
      setDataUser,
      hideFeedback,
      loading,
      feedback,
      staticTheme,
      goToForgotPasswordScreen
  };

  return (
      <Context.Provider value={value}>
        {props.children}
      </Context.Provider>
  );
}
export default Provider;