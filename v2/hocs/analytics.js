import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
} from 'react';
import {Platform, AppState} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {AppEventsLogger} from 'react-native-fbsdk';
// import MCReactModule from 'react-native-marketingcloudsdk';
import moment from 'moment';

import API from '../helpers/api';
import database from '../helpers/database';
import getUserInfo from '../helpers/getUserInfo';
import {useGlobalStateContext} from './globalState';
import {useOfflineDataContext} from './offlineData';
import {usePermissionsContext} from './permissions';
import {useLayoutContext} from './layout';
import {createUUID} from '../utils/id';
import {TRACKER_URL} from '../constants/env';
import {APP_DISTRO_NAME} from '../constants/app';

const Context = createContext();
export const useAnalyticsContext = () => useContext(Context);

const AnalyticsProvider = props => {
  const {
    generalData,
    userInfo,
    deviceLocation,
    addExternalMethods: addExternalMethodsToGlobalState,
  } = useGlobalStateContext();
  const {addExternalMethods: addExternalMethodsToOfflineData} =
    useOfflineDataContext();
  const {permissionsStatus} = usePermissionsContext();
  const {DATABASE_APP_THEME_KEY} = useLayoutContext();
  const [firstTime, setFirstTime] = useState(true);
  const [whitelabelData, setWhitelabelData] = useState(null);
  const uniqueIDRef = useRef();
  const sessionIDRef = useRef(createUUID() + '@' + Date.now());
  const deviceRef = useRef();
  const uniqueID = uniqueIDRef.current;
  const sessionID = sessionIDRef.current;
  const device = deviceRef.current;

  useLayoutEffect(() => {
    addExternalMethodsToGlobalState({dispatchRecord});
    addExternalMethodsToOfflineData({dispatchRecord});
  }, []);

  useLayoutEffect(() => {
    database.get('uniqueID').then(ID => {
      if (!ID) {
        let freshUniqueID = createUUID() + '@' + Date.now();
        uniqueIDRef.current = freshUniqueID;
        database.set('uniqueID', freshUniqueID);
      } else {
        uniqueIDRef.current = ID;
      }
    });
  }, []);

  useLayoutEffect(() => {
    getDevice().then(device => {
      deviceRef.current = device;
    });
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  useLayoutEffect(() => {
    database
      .get(DATABASE_APP_THEME_KEY)
      .then(JSON.parse)
      .then(setWhitelabelData);
  }, []);

  useEffect(() => {
    if (!userInfo || !firstTime) {
      return;
    }

    setFirstTime(false);
    // MCReactModule.enablePush();
    // MCReactModule.setContactKey(String(userInfo.id));
    dispatchRecord('Abertura do App', {
      json: {
        appVersion: DeviceInfo.getReadableVersion(),
        device,
      },
    });
    defineUserInfo();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo || !permissionsStatus) {
      return;
    }

    sendMainUserInfo();
  }, [userInfo, permissionsStatus]);

  async function getDevice() {
    let parts = await Promise.all([
      DeviceInfo.getBrand(),
      DeviceInfo.getDeviceName(),
      DeviceInfo.getSystemName(),
      DeviceInfo.getSystemVersion(),
    ]);
    return parts.join(' ').toUpperCase();
  }

  async function getItemMainData(key, id) {
    if (!key || !id) {
      return '';
    }

    return new Promise(resolve =>
      setInterval(() => {
        try {
          let data = {
            challengesId: generalData.challengesByID[id],
            eventsId: generalData.eventsByID[id],
            scriptsId: generalData.guidesByID[id],
            momentsId: generalData.momentsByID[id],
            moviesId: generalData.moviesByID[id],
            partnerUnitId: generalData.unitsByID[id],
          }[key];
          if (!data) {
            return '';
          }

          let name = {
            challengesId: data.title,
            eventsId: data.name,
            scriptsId: `${data.title1} ${data.title2}`,
            momentsId: data.title,
            moviesId: data.title,
            partnerUnitId: data.fantasyName,
          }[key];
          let currentVersion =
            key === 'partnerUnitId'
              ? data.partner.currentVersion
              : data.currentVersion;
          return resolve(
            JSON.stringify({
              name,
              id: data.id,
              slug: data.slug,
              currentVersion,
            }),
          );
        } catch {
          //
        }
      }, 1000),
    );
  }

  async function createRecord(event, params) {
    let user = userInfo || (await getUserInfo());
    let payload = {
      ...(params.json || {}),
      ...params,
      json: undefined,
      event,
      datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
      whiteLabelId: whitelabelData?.id,
      whiteLabelName: whitelabelData?.title,
    };
    let objectId = Object.keys(params).find(key => /^\w+Id$/.test(key));

    let club = (((user || {}).subscriptions || [])[0] || {}).hasClub || false;
    let eventNotes = JSON.stringify(payload) || '';
    let jwt = (user || {}).jwtGazeta;
    let latitude = ((deviceLocation || {}).coords || {}).latitude;
    let longitude = ((deviceLocation || {}).coords || {}).longitude;
    let sdk =
      APP_DISTRO_NAME +
      ' ' +
      {
        ios: 'iOS',
        android: 'Android',
      }[Platform.OS];
    let subscriptionId =
      (((user || {}).subscriptions || [])[0] || {}).subscriptionId || 0;
    let url = await getItemMainData(objectId, params[objectId]);
    let userId = (user || {}).id;

    return {
      article: '',
      club,
      contentId: '',
      eventNotes,
      eventType: 'hit',
      jwt,
      latitude,
      longitude,
      publisherId: 'clube-app',
      referrer: '',
      sdk,
      section: '',
      sessionId: sessionID,
      site: '',
      statsWeight: 0,
      subscriptionId,
      thumbUrl: '',
      ticketId: uniqueID,
      timezone: -3,
      title: '',
      userAgent: device,
      userId,
      url,
    };
  }

  async function dispatchRecord(event, params) {
    let record = await createRecord(event, params || {});
    try {
      await API.call(
        {
          method: 'post',
          baseURL: TRACKER_URL,
          url: '/register',
          data: record,
        },
        true,
      );
    } catch {
      //
    }
  }

  function handleAppStateChange(appState) {
    if (appState === 'inactive') {
      return;
    }
    if (firstTime) {
      return;
    }

    dispatchRecord('Estado do App', {
      value: {
        [appState]: appState,
        active: 'Ativo',
        background: 'Em segundo plano',
      }[appState],
    });
  }

  function handleNavigation({route, params}) {
    let value = {
      [route]: route,
      Splash: 'Inicialização',
      AuthSwitch: 'Escolher forma de autenticação',
      SignIn: 'Entrar',
      SignUp: 'Cadastrar',
      SignUpSocial: 'Cadastro via rede social',
      ForgetPassword: 'Recuperar senha',
      Payment: 'Pagamento',
      OnBoarding: 'On-boarding',
      DeepLinking: 'Roteamento de links abertos',
      Home: 'Home',
      VIP: 'Área VIP',
      Maps: 'Visualização de mapa',
      Search: 'Pesquisar',
      Places: 'Lista de lugares',
      Categories: 'Lista de categorias',
      Events: 'Lista de eventos',
      Movies: 'Lista de filmes',
      News: 'Lista de notícias',
      SpecificNews: 'Lista de notícias específicas de whitelabel',
      Mural: 'Lista de notícias de mural de whitelabel',
      TagsFilters: 'Filtrar por tags',
      PlaceDetails: 'Detalhes de unidade de parceiro',
      EventDetails: 'Detalhes de evento',
      MovieDetails: 'Detalhes de filme',
      ChallengeDetails: 'Detalhes de desafio',
      NewsDetails: 'Detalhes de notícia',
      SpecificNewsDetails: 'Detalhes de notícia específica de whitelabel',
      DiscountRequest: 'Requisição de desconto',
      DiscountResult: 'Resultado de requisição de desconto',
      Checkout: 'Fechamento de pedido',
      Evaluation: 'Avaliação',
      Gallery: 'Lista de imagens',
      Image: 'Visualização de imagem',
      Ratings: 'Lista de avaliações',
      Profile: 'Perfil',
      Notifications: 'Lista de notificações',
      ProfileMenu: 'Lista de opções',
      Uses: 'Lista de utilizações',
      Settings: 'Preferências',
      IndicateEstablishment: 'Indicar estabelecimento',
      PolicyAndPrivacy: 'Política de privacidade',
      HelpCentre: 'Central de ajuda',
      RecommendToFriends: 'Recomendar a amigos',
      ConvertedFriends: 'Amigos indicados',
      VIPRules: 'Regulamento do VIP',
      Billing: 'Faturamento',
      PaymentMethods: 'Meios de pagamento',
      AddPaymentMethod: 'Cadastro de meio de pagamento',
      Debug: 'Tela de debug',
    }[route];

    let specificValue = {};
    let specificKeyByType = {
      category: 'categoriesSlug',
      event: 'eventsId',
      guide: 'scriptsId',
      moment: 'momentsId',
      movie: 'moviesId',
      place: 'partnerUnitId',
    }[params.type];
    let specificKeyByRoute = {
      ChallengeDetails: 'challengesId',
      EventDetails: 'eventsId',
      GuideDetails: 'scriptsId',
      MomentDetails: 'momentsId',
      MovieDetails: 'moviesId',
      NewsDetails: 'newsSlug',
      PlaceDetails: 'partnerUnitId',
    }[route];
    let specificKey = specificKeyByType || specificKeyByRoute;
    if (specificKey) {
      specificValue[specificKey] = params.key || params.id || params.slug;
    }
    if (params.hasOwnProperty('placeId')) {
      specificValue.partnerUnitId = params.placeId;
    }

    let json = {};
    if (params.hasOwnProperty('VIP')) {
      json.viewingAsVIP = params.VIP;
    }
    if (params.hasOwnProperty('type')) {
      json.type = params.type;
    }

    dispatchRecord('Navegação', {
      ...specificValue,
      value,
      json,
    });
  }

  function defineUserInfo() {
    analytics().setUserId(String(userInfo.id));
  }

  async function sendMainUserInfo() {
    try {
      let firebaseToken = await messaging().getToken();
      await API.call({
        method: 'post',
        url: '/api/saveData',
        headers: {
          Authorization: `Bearer ${userInfo.tokenJWTClube}`,
        },
        data: {
          name: userInfo.name,
          photo: userInfo.img,
          firebaseToken,
          pushNotificationIsAvaliable: permissionsStatus.notification,
          geolocationIsAvailable: permissionsStatus.location,
          geopushIsAvailable: permissionsStatus.geopush,
          appName: APP_DISTRO_NAME,
          whiteLabelId: whitelabelData?.id,
        },
      });
    } catch {
      //
    }
  }

  function getActiveRouteName(state) {
    if (!state) {
      return null;
    }

    let route = state.routes[state.index];
    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route;
  }

  function trackScreens(previousState, currentState) {
    let currentRoute = getActiveRouteName(currentState);
    let previousRoute = getActiveRouteName(previousState);

    try {
      const params = {
        route: currentRoute.routeName,
        params: currentRoute.params || {},
      };
      handleNavigation(params);
      analytics().logScreenView({
        screen_name: currentRoute.routeName,
        screen_class: currentRoute.routeName,
      });
      analytics().logEvent('Navigate', params);
      AppEventsLogger.logEvent('Navigate', params);
    } catch {
      //
    }
  }

  const value = {
    dispatchRecord,
    trackScreens,
    getActiveRouteName,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default AnalyticsProvider;
