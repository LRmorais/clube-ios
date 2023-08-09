import React, {
  createContext,
  useContext as useReactContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Keyboard, Linking } from 'react-native';

import analytics from '@react-native-firebase/analytics';
import GraphQLEmpresas from '../../helpers/graphqlEmpresasApi';

import API from '../../helpers/api';
import database from '../../helpers/database';
import { useLayoutContext } from '../../hocs/layout';
import { useGlobalStateContext } from '../../hocs/globalState';
import { useAnalyticsContext } from '../../hocs/analytics';
import { APP_DISTRO } from '../../constants/app';

const Context = createContext();
export const useContext = () => useReactContext(Context);


const Provider = props => {
  const { palette, loadTheme } =
    useLayoutContext();
  const screenPalette = palette.companies;
  const { updateUserInfo } = useGlobalStateContext();
  const { dispatchRecord } = useAnalyticsContext();
  const documentFieldRef = useRef();
  const birthdayFieldRef = useRef();
  const phoneFieldRef = useRef();
  const emailFieldRef = useRef();

  const [fullname, setFullname] = useState('');
  const [registrationNumber, setRegisterNumber] = useState('');
  const [document, setDocument] = useState('');
  const [convertedDocument, setConvertedDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [convertBirthday, setconvertBirthday] = useState('');

  const [isTermsCheckbox, setIsTermsCheckbox] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [staticTheme, setStaticTheme] = useState(null);

  const whiteLabelId = props.navigation.getParam('whiteLabelId');

  async function openTermsAction() {
    await Linking.openURL(
      'https://clube.gazetadopovo.com.br/sobre-o-clube/termos-de-uso?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet',
    );
  }
  async function openPoliticsAction() {
    await Linking.openURL(
      'https://www.gazetadopovo.com.br/politica-de-privacidade?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet',
    );
  }

  function toggleCheckTerms() {
    setIsTermsCheckbox(!isTermsCheckbox);
    // console.log(isTermsCheckbox);
  }

  function returnToPreviousScreen() {
    props.navigation.goBack();
  }


  function hideFeedback() {
    // setPassword('');
    setFeedback(false);
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

  const checkFullnameError = checkError(
    'fullname',
    () => fullname === '' && 'invalid',
  );
  const checkRegisterNumberError = checkError(
    'registrationNumber',
    () => registrationNumber === '' && 'invalid',
  );

  const validateDocument = e => {
    let text = e.replace(/\D(!?\.)/g, '');

    if (text.length === 3 || text.length === 7) {
      text += '.';
    }

    if (text.length === 11) {
      text += '-';
    }

    if (text.length < 15) {
      const doc = text.replace(/,/g, '').replace(/\./g, '').replace(/-/g, '');
      setConvertedDocument(doc);
      setDocument(text);
    }

    return;
  };

  const validateBirthday = e => {
    let value = e.replace(/\D/g, '');
    console.log(value);
    setBirthday(value);
    if (value.length === 0) {
      return '';
    }

    let { day, month, year } = value.match(
      /(?<day>\d{0,2})(?<month>\d{0,2})(?<year>\d{0,4})/,
    ).groups;
    setconvertBirthday([year, month, day].filter(Boolean).join('/'));
    return;
  };

  const validatePhone = e => {
    // Validation and clear here
    const content = e.replace(/\D/g, '');

    if (content.length < 12) {
      setPhone(content);
    }
    return;
  };

  const validateEmail = e => {
    // Validation and clear here
    setEmail(e);
  };

  const checkDocumentError = checkError('document', () => {
    const regexp = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;
    return !regexp.test(document) && 'invalid';
  });

  const checkBirthdayError = checkError('birthday', () => {
    const regexp = /\d{2}\d{2}\d{4}/g;
    return !regexp.test(birthday) && 'invalid';
  });

  const checkPhoneError = checkError('phone', () => {
    const regexp = /\d{11}|\d{10}/g;
    return !regexp.test(phone) && 'invalid';
  });

  const checkEmailError = checkError('email', () => {
    const regexp = /\S+@\S+\.\S+/g;
    return !regexp.test(email) && 'invalid';
  });


  function focusDocumentField() {
    documentFieldRef.current.focus();
  }
  function focusBirthdayField() {
    birthdayFieldRef.current.focus();
  }
  function focusPhoneField() {
    phoneFieldRef.current.focus();
  }
  function focusEmailField() {
    emailFieldRef.current.focus();
  }

  async function getCreateUserLogan({
    name,
    document,
    phone,
    birthday,
    email,
    registrationNumber,
  }) {
    try {
      let result = await GraphQLEmpresas({
        query: `mutation Mutation(
          $name: String!
          $document: String!
          $phone: Phone
          $birthday: Birthday
          $email: Email
          $registrationNumber: String
        ){
          addEmployeeLoganIntegration(
            name: $name
            document: $document
            phone: $phone
            birthday: $birthday
            email: $email
            registrationNumber: $registrationNumber
          ){
            id
                registrationNumber
                digitalUserId
                subscriptionId
                document
          }
        }`,
        variables: {
          registrationNumber: registrationNumber,
          name: name,
          document: document,
          birthday: birthday,
          phone: phone,
          email: email,
        },
      });
      if (result.status !== 200) {
        setFeedback('wrong');
        throw [];
      }
      if (result?.data?.errors?.length > 0) {
        setFeedback('wrong');
        throw [];
      }

      return result.data.data.addEmployeeLoganIntegration
    } catch (e) {
      setFeedback('any');
      return [];
    }
  }

  async function getUserNotLogan(){
    try {
      let result = await GraphQLEmpresas({
        query: `query Query($registrationNumber: String!, $whiteLabelId: Int!){
          verifyEmployeeLoganIntegration(registrationNumber: $registrationNumber, whiteLabelId: $whiteLabelId){
            id
            registrationNumber
            whiteLabelId
            offerId
            situation
          }
        }`,
        variables: {
          registrationNumber: String(registrationNumber),
          whiteLabelId: Number(whiteLabelId),
        },
      });
      if (result.status !== 200) {
        setFeedback('wrong');
        throw [];
      }
      if (result?.data?.errors?.length > 0) {
        setFeedback('wrong');
        throw [];
      }

      return result.data.data.verifyEmployeeLoganIntegration
    } catch (e) {
      setFeedback('any');
      return [];
    }
  }

  async function signIn() {
    Keyboard.dismiss();

    const errorsExistents = [
      checkFullnameError(),
      checkRegisterNumberError(),
      checkDocumentError(),
      checkPhoneError(),
      checkEmailError(),
      checkBirthdayError()
    ];

    if (errorsExistents.some(error => error !== false)) {
      return;
    }

    console.log({
      status: 'Ready to send',
      data: {
        registrationNumber: registrationNumber,
        name: fullname,
        document: convertedDocument,
        birthday: convertBirthday,
        phone,
        email,
      },
    });
    setLoading(true);
    const existUserNotLogan = await getUserNotLogan();
    console.log("existUserNotLogan", existUserNotLogan)
    if(existUserNotLogan.length == 0){
      setLoading(false);
    }else{
      const createUserLogan = await getCreateUserLogan({
        registrationNumber: registrationNumber,
        name: fullname,
        document: convertedDocument,
        birthday: convertBirthday,
        phone,
        email,
      })

      console.log("createUserLogan", createUserLogan)


      if(createUserLogan.length == 0){
        setLoading(false);
      }else{
        try {
          dispatchRecord('Entrar', {
            value: 'Regular',
          });
    
          let result = await API.call({
            method: 'post',
            url: '/api/login',
            data: {
              username: convertedDocument,
              password: convertedDocument.replace(/\D/g, "").slice(0, 6),
              appDistro: APP_DISTRO,
            },
          });
    
          if (result.status === 200) {
            await loadTheme((result.data.subscriptions || [])[0]?.offerId);
            await database.set('user-info', JSON.stringify(result.data));
            setLoading(false);
            updateUserInfo();
            analytics().logEvent('Login_Sucesso');
    
            let { hasClub } = (result.data.subscriptions || [])[0] || {};
            props.navigation.navigate(hasClub ? 'OnBoarding' : 'Payment');
          } else {
            setLoading(false);
            setFeedback('wrong');
            analytics().logEvent('Login_Erro');
          }
        } catch {
          setFeedback('any');
          setLoading(false);
        }
      }
    }
  }



  const value = {
    screenPalette,
    documentFieldRef,
    birthdayFieldRef,
    phoneFieldRef,
    emailFieldRef,
    fullname,
    setFullname,
    setRegisterNumber,
    document,
    birthday,
    phone,
    email,
    isTermsCheckbox,
    setDocument,
    errors,
    loading,
    feedback,
    staticTheme,
    openTermsAction,
    openPoliticsAction,
    toggleCheckTerms,
    returnToPreviousScreen,
    hideFeedback,
    validateDocument,
    validateBirthday,
    validatePhone,
    validateEmail,
    checkFullnameError,
    checkRegisterNumberError,
    checkDocumentError,
    checkPhoneError,
    checkEmailError,
    checkBirthdayError,
    focusDocumentField,
    focusBirthdayField,
    focusPhoneField,
    focusEmailField,
    signIn,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
