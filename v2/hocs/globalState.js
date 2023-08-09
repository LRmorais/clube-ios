import React, {createContext, useContext, useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import Crypto from 'crypto-js';

import activateBackgroundLocation from '../helpers/activateBackgroundLocation';
import database from '../helpers/database';
import API from '../helpers/api';
import getUserInfo from '../helpers/getUserInfo';
import {usePermissionsContext} from '../hocs/permissions';
import {useLayoutContext} from '../hocs/layout';
import {MAIN_DATA_KEY_IDENTIFIER} from '../hocs/offlineData';
import {LAMBDA_BASE_URL, PAYMENT_ORDER_ENCRYPTION_KEY} from '../constants/env';

const Context = createContext();
export const useGlobalStateContext = () => useContext(Context);

const USER_INFO_REMOTE_LAST_TIME = 'USER_INFO_REMOTE_LAST_TIME';

const GlobalStateProvider = props => {
  const {permissionsStatus} = usePermissionsContext();
  const {theme, loadTheme, removeTheme} = useLayoutContext();
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const [visibleModalCategories, setVisibleModalCategories] = useState(false);
  const [disableScroll, setDisableScroll] = useState(true);
  const [paymentOrders, setPaymentOrders] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [firstTimeUserFromRemote, setFirstTimeUserFromRemote] = useState(true);
  const [completeProfileModalVisible, setCompleteProfileModalVisible] =
    useState(false);

  const [subscriptionProgressID, setSubscriptionProgressID] = useState();
  const [canSendProgressStep, setCanSendProgressStep] = useState(true);
  const [nextProgressPayload, setNextProgressPayload] = useState(null);

  const [externalMethods, setExternalMethods] = useState({});
  const ANALYTICS__dispatchRecord =
    externalMethods.dispatchRecord || new Function();

  activateBackgroundLocation(permissionsStatus?.geopush);

  useEffect(() => {
    getUserInfo()
      .then(userInf => {
        if (userInf !== null && !userInf.email) {
          showCompleteProfileModal();
        }
      })
      .catch(error => {
        console.log('Error na chamada do UserInfo');
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }
    if (!canSendProgressStep || !nextProgressPayload) {
      return;
    }

    registerProgressStep(nextProgressPayload);
  }, [nextProgressPayload, canSendProgressStep, ANALYTICS__dispatchRecord]);

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }

    updateUserInfo();
  }, [ANALYTICS__dispatchRecord]);

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }
    if (userInfo === null) {
      return;
    }
    if (!firstTimeUserFromRemote) {
      return;
    }

    updateUserInfoFromRemote(true);
  }, [userInfo, ANALYTICS__dispatchRecord]);

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }
    if (userInfo === null) {
      return;
    }

    getPaymentOrders();
  }, [userInfo, ANALYTICS__dispatchRecord]);

  useEffect(() => {
    if (!ANALYTICS__dispatchRecord) {
      return;
    }
    if (!generalData) {
      return;
    }

    updateThemeDependentData();
  }, [userInfo, ANALYTICS__dispatchRecord]);

  useEffect(() => {
    if (permissionsStatus?.location) {
      updateDeviceLocation();
    }
  }, [permissionsStatus?.location]);

  useEffect(() => {
    let hasPermission = permissionsStatus?.location;

    if (!hasPermission) {
      setLocationError('permission');
    } else if (!deviceLocation) {
      setLocationError('location');
    } else {
      setLocationError(null);
    }
  }, [permissionsStatus, deviceLocation]);

  function noop() {}

  function showCompleteProfileModal() {
    setCompleteProfileModalVisible(true);
  }

  function hideCompleteProfileModal() {
    setCompleteProfileModalVisible(false);
  }

  function addExternalMethods(methods) {
    setExternalMethods(externalMethods => ({
      ...externalMethods,
      ...methods,
    }));
  }

  async function registerProgressStep(payload) {
    try {
      setCanSendProgressStep(false);
      setNextProgressPayload(null);
      let response = await API.call({
        method: 'post',
        baseURL: LAMBDA_BASE_URL,
        url: '/api/create/abandonedShoppingCart',
        data: {
          ...payload,
          id: subscriptionProgressID,
          origin: 'app',
        },
      });
      if (response.data.id) {
        setSubscriptionProgressID(response.data.id);
      }
      setCanSendProgressStep(true);
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'registerProgressStep',
        params: {payload},
        error: e.toString(),
      });
    }
  }

  async function updateUserInfo() {
    let userInf = await getUserInfo();

    if (userInf !== null) {
      setUserInfo({
        ...userInf,
        status: {
          vip: false,
          currentScore: 0,
          objectiveScore: 6,
        },
      });
      loadTheme((userInfo?.subscriptions || [])[0]?.offerId);
    }
  }

  async function updateUserInfoFromRemote(forceUpdate = false) {
    if (!userInfo) {
      return;
    }

    try {
      if (forceUpdate) {
        setFirstTimeUserFromRemote(false);
      }
      let lastTime = await database.get(USER_INFO_REMOTE_LAST_TIME);
      if (
        forceUpdate ||
        !lastTime ||
        Date.now() - Number(lastTime) > 60 * 60 * 24 * 1000 * 2
      ) {
        let result = await API.call({
          method: 'get',
          url: '/api/user',
          headers: {
            Authorization: `Bearer ${userInfo.tokenJWTClube}`,
          },
        });
        if (result.status !== 200) {
          return null;
        }

        await Promise.all([
          database.set('user-info', JSON.stringify(result.data)),
          database.set(USER_INFO_REMOTE_LAST_TIME, String(Date.now())),
        ]);
      }
      updateUserInfo();
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'updateUserInfoFromRemote',
        params: {forceUpdate},
        error: e.toString(),
      });
      return null;
    }
  }

  async function updateDeviceLocation() {
    if ((permissionsStatus || {}).location) {
      Geolocation.setRNConfiguration({
        authorizationLevel: 'auto',
      });

      Geolocation.stopObserving();

      Geolocation.watchPosition(setDeviceLocation, noop, {
        maximumAge: 1000 * 60 * 45, // 45min
        distanceFilter: 5,
        enableHighAccuracy: false,
      });
    }
  }

  function removeUserInfo() {
    database.remove('user-info').then(updateUserInfo);
    database.remove(USER_INFO_REMOTE_LAST_TIME);
    setGeneralData(generalData => ({
      ...generalData,
      specificNews: null,
    }));
    removeTheme();
    setPaymentOrders(null);
  }

  async function getPaymentOrders(force) {
    if (paymentOrders && !force) {
      return;
    }

    try {
      let list = await API.call({
        method: 'get',
        url: `paymentOrder/${userInfo.id}/list.json`,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
      if (list.status !== 200) {
        return;
      }

      let orders = await Promise.all(
        list.data.map(order =>
          API.call({
            method: 'get',
            url: `paymentOrder/${userInfo.id}/${order.id}`,
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
          })
            .then(order => decryptPaymentOrderInfo(order.data))
            .catch(() => null),
        ),
      ).then(list => list.filter(Boolean));
      setPaymentOrders(orders);
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'getPaymentOrders',
        params: {force},
        error: e.toString(),
      });
    }
  }

  function getMainData() {
    return database.get(MAIN_DATA_KEY_IDENTIFIER).then(JSON.parse);
  }

  function getCategories() {
    return database.get('categories').then(JSON.parse);
  }

  function getEvaluationTags() {
    return database.get('evaluation-tags').then(JSON.parse);
  }

  async function getNews() {
    try {
      let result = await API.call({
        method: 'get',
        url: '/portal/noticias/news.json',
      });
      if (result.status !== 200) {
        throw null;
      }

      return result.data;
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'getNews',
        params: {},
        error: e.toString(),
      });
      return null;
    }
  }

  async function getSpecificNews() {
    if (!theme?.id) {
      return;
    }

    try {
      let result = await API.call({
        method: 'get',
        url: `/api/repository/whilelabel/news/${theme.id}.json`,
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (result.status !== 200) {
        throw null;
      }

      return result.data;
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'getSpecificNews',
        params: {},
        error: e.toString(),
      });
      return null;
    }
  }

  function transformMainData(data) {
    try {
      // events
      let events = data.events.filter(event =>
        (event.EventsProgrammings || []).some(({endDate}) =>
          moment(endDate).endOf('day').isAfter(Date.now()),
        ),
      );
      // movies
      let now = new Date();
      now.setHours(0, 0, 0, 0);
      let movies = data.movies.filter(movie =>
        movie.MoviesSessions.some(session => now <= new Date(session.date)),
      );
      // units
      let units = data.partners
        .map(partner =>
          (partner.PartnerUnits || []).map(unit => ({
            ...unit,
            partner: {
              ...partner,
              PartnerUnits: undefined,
            },
          })),
        )
        .flat();

      let [
        eventsByID,
        guidesByID,
        momentsByID,
        moviesByID,
        challengesByID,
        unitsByID,
      ] = [
        events,
        data.scripts,
        data.moments,
        movies,
        data.challenges,
        units,
      ].map(data =>
        (data || []).reduce(
          (cumulative, current) => ({
            ...cumulative,
            [current.id]: current,
          }),
          {},
        ),
      );
      return {
        eventsByID,
        guidesByID,
        momentsByID,
        moviesByID,
        challengesByID,
        unitsByID,
      };
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'transformMainData',
        params: {data: 'TOO_BIG'},
        error: e.toString(),
      });
      throw e;
    }
  }

  function transformOtherData(data) {
    try {
      let {categories, evaluationTags, partners} = data;
      let categoriesBySlug = categories.reduce((cumulative, current) => {
        let atLeastOnePartner = partners.some(partner =>
          (partner.PartnerTags || []).some(
            ({Tag}) => Tag.slug === current.slug,
          ),
        );
        if (!atLeastOnePartner) {
          return cumulative;
        }

        let hasAtLeastOneVIP = partners.some(
          ({partnerType}) => partnerType === 2 || partnerType === 3,
        );
        return {
          ...cumulative,
          [current.slug]: {
            ...(current || {}),
            hasAtLeastOneVIP,
          },
        };
      }, {});
      let evaluationTagsByID = evaluationTags.reduce(
        (cumulative, current) => ({
          ...cumulative,
          [current.id]: current,
        }),
        {},
      );
      return {
        evaluationTagsByID,
        categoriesBySlug,
      };
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'transformOtherData',
        params: {data: 'TOO_BIG'},
        error: e.toString(),
      });
      throw e;
    }
  }

  async function updateGeneralData(data) {
    try {
      let [mainData, categories, evaluationTags] = await Promise.all([
        data?.mainData || getMainData(),
        data?.categories || getCategories(),
        data?.evaluationTags || getEvaluationTags(),
      ]);
      if (!mainData || !categories || !evaluationTags) {
        return;
      }

      setGeneralData({
        ...transformMainData(mainData),
        ...transformOtherData({
          categories,
          evaluationTags,
          partners: mainData.partners,
        }),
      });
      let [news, specificNews] = await Promise.all([
        getNews(),
        getSpecificNews(),
      ]);
      setGeneralData(generalData => ({
        ...generalData,
        news,
        specificNews,
      }));
    } catch (e) {
      console.log('Deu pau no carregamento de dados');
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'updateGeneralData',
        params: {data: 'TOO_BIG'},
        error: e.toString(),
      });
    }
  }

  async function updateThemeDependentData() {
    try {
      let specificNews = await getSpecificNews();
      setGeneralData(generalData => ({
        ...generalData,
        specificNews,
      }));
    } catch (e) {
      ANALYTICS__dispatchRecord('Catch__App', {
        functionName: 'updateThemeDependentData',
        params: {},
        error: e.toString(),
      });
    }
  }

  function getEncryptionKey() {
    return 'CG!' + userInfo?.id + '!@#' + userInfo?.id * 2;
  }

  function encryptPaymentInfo(data) {
    return Crypto.AES.encrypt(
      JSON.stringify(data),
      getEncryptionKey(),
    ).toString();
  }

  function decryptPaymentInfo(cipher) {
    return JSON.parse(
      Crypto.AES.decrypt(cipher, getEncryptionKey()).toString(Crypto.enc.Utf8),
    );
  }

  function decryptPaymentOrderInfo(cipher) {
    return JSON.parse(
      Crypto.AES.decrypt(cipher, PAYMENT_ORDER_ENCRYPTION_KEY).toString(
        Crypto.enc.Utf8,
      ),
    );
  }

  const value = {
    sideMenuVisible,
    setSideMenuVisible,
    userInfo,
    deviceLocation,
    generalData,
    paymentOrders,
    locationError,
    completeProfileModalVisible,
    showCompleteProfileModal,
    hideCompleteProfileModal,
    addExternalMethods,
    setNextProgressPayload,
    updateUserInfo,
    updateUserInfoFromRemote,
    updateDeviceLocation,
    removeUserInfo,
    getPaymentOrders,
    updateGeneralData,
    encryptPaymentInfo,
    decryptPaymentInfo,
    decryptPaymentOrderInfo,
    visibleModalCategories,
    setVisibleModalCategories,
    setDisableScroll,
    disableScroll,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default GlobalStateProvider;
