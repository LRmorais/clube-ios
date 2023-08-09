import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import {Linking} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import database from '../helpers/database';
import {useLayoutContext} from './layout';
import {useGlobalStateContext} from './globalState';
import {usePermissionsContext} from './permissions';
import {useAnalyticsContext} from './analytics';
import {getDistance} from '../utils/map';
import {APP_DISTRO} from '../constants/app';

const Context = createContext();
export const useNotificationsContext = () => useContext(Context);

const GEOPUSH_NOTIFICATION_LAST_TIME_KEY = 'GEOPUSH_NOTIFICATION_LAST_TIME_KEY';
const NOTIFICATIONS_ARRAY_KEY = 'NOTIFICATIONS_ARRAY_KEY';

const NotificationsProvider = props => {
  const {theme} = useLayoutContext();
  const {userInfo, deviceLocation, generalData} = useGlobalStateContext();
  const {permissionsStatus} = usePermissionsContext();
  const {dispatchRecord} = useAnalyticsContext();
  const [neededRoute, setNeededRoute] = useState(null);
  const [allNotifications, setAllNotifications] = useState(null);
  const offersTopicsKey = 'OFFERS_TOPICS_KEY';
  const whitelabelTopicKey = 'WHITELABEL_TOPIC_KEY';
  const mainTopic =
    process.env.NODE_ENV === 'production' ? '__all_users' : 'ksjdbfksdjbfks';
  const nonUsersTopic = '__non_users';

  const canReceive = [
    userInfo && ((userInfo?.subscriptions || [])[0] || {}).hasClub,
    permissionsStatus && permissionsStatus.notification,
  ].every(thing => thing);

  useLayoutEffect(() => {
    PushNotification.configure({
      onNotification(notification) {
        if (notification.userInteraction) {
          handleNotificationOpened({notification});
        } else {
          if (canReceive) {
            handleNotification(notification);
          }
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    });

    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'FCM',
        channelDescription: 'FCM notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {},
    );
    PushNotification.createChannel(
      {
        channelId: 'common',
        channelName: 'Common',
        channelDescription: 'General notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {},
    );
    PushNotification.createChannel(
      {
        channelId: 'geopush',
        channelName: 'Geopush',
        channelDescription: 'Geopush notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => {},
    );
  }, []);

  useEffect(() => {
    if (!canReceive) {
      if (APP_DISTRO === 'main') {
        messaging().subscribeToTopic(nonUsersTopic);
      }
      messaging().unsubscribeFromTopic(mainTopic);
      database
        .get(offersTopicsKey)
        .then(JSON.parse)
        .then(offers => {
          if (!offers) {
            return;
          }

          offers.forEach(offer =>
            messaging().unsubscribeFromTopic(String(offer)),
          );
          database.remove(offersTopicsKey);
        });
      database.get(whitelabelTopicKey).then(whitelabelID => {
        if (!whitelabelID) {
          return;
        }

        messaging().unsubscribeFromTopic(whitelabelID);
        database.remove(whitelabelTopicKey);
      });
      return;
    }

    messaging().requestPermission();

    messaging().subscribeToTopic(mainTopic);
    if (APP_DISTRO === 'main') {
      messaging().unsubscribeFromTopic(nonUsersTopic);
    }
    if (userInfo?.subscriptions) {
      database
        .get(offersTopicsKey)
        .then(JSON.parse)
        .then(offers => {
          let oldOffers = (offers || []).filter(
            oldOffer => !(userInfo?.subscriptions || []).includes(oldOffer),
          );
          let newOffers = (userInfo?.subscriptions || [])
            .filter(newOffer => !(offers || []).includes(newOffer))
            .map(({offerId}) => offerId);
          oldOffers.forEach(offer =>
            messaging().unsubscribeFromTopic(String(offer)),
          );
          newOffers.forEach(offer =>
            messaging().subscribeToTopic(String(offer)),
          );
          if (newOffers.length > 0) {
            database.set(offersTopicsKey, JSON.stringify(newOffers));
          }
        });
    }
    if (theme) {
      database.get(whitelabelTopicKey).then(whitelabelID => {
        if (~~whitelabelID === theme.id) {
          return;
        }

        messaging().unsubscribeFromTopic('whitelabel-' + whitelabelID);
        messaging().subscribeToTopic('whitelabel-' + theme.id);
        database.set(whitelabelTopicKey, String(theme.id));
      });
    }
  }, [canReceive, theme]);

  useEffect(() => {
    messaging()
      .requestPermission()
      .then(messaging().registerDeviceForRemoteMessages);
    messaging().getInitialNotification().then(updateNotitications);
    database
      .get(NOTIFICATIONS_ARRAY_KEY)
      .then(JSON.parse)
      .then(notifications => {
        if (notifications) {
          setAllNotifications(notifications);
        }
      });
  }, []);

  useEffect(() => {
    if (
      !permissionsStatus?.geopush ||
      !deviceLocation?.coords ||
      !generalData
    ) {
      return;
    }

    database
      .get(GEOPUSH_NOTIFICATION_LAST_TIME_KEY)
      .then(JSON.parse)
      .then(geopushLastTime => {
        let twoMinutesAgo = Date.now() - 1000 * 60 * 2;
        if (
          Object.values(geopushLastTime || {}).some(
            lastTime => lastTime > twoMinutesAgo,
          )
        ) {
          return;
        }

        let notificable = Object.values(generalData.unitsByID)
          .filter(place => {
            let distance = getDistanceFromLocation(place);
            return distance < 20;
          })
          .sort(
            (one, another) =>
              getDistanceFromLocation(one) - getDistanceFromLocation(another),
          )
          .find(place => {
            let lastTimeShown = (geopushLastTime || {})[place.id] || 0;
            let oneDayAgo = Date.now() - 1000 * 60 * 60 * 24;
            return lastTimeShown < oneDayAgo;
          });
        if (!notificable) {
          return;
        }

        database.set(
          GEOPUSH_NOTIFICATION_LAST_TIME_KEY,
          JSON.stringify({
            ...(geopushLastTime || {}),
            [notificable.id]: Date.now(),
          }),
        );
        showLocalNotification(notificable);
      });
  }, [deviceLocation, generalData, permissionsStatus]);

  function getDistanceFromLocation(place) {
    return getDistance(
      {lat: Number(place.latitude), lng: Number(place.longitude)},
      {
        lat: deviceLocation.coords.latitude,
        lng: deviceLocation.coords.longitude,
      },
    );
  }

  async function updateNotitications(message) {
    if (!message?.data || !message?.notification) {
      return;
    }

    let notifications = await database
      .get(NOTIFICATIONS_ARRAY_KEY)
      .then(JSON.parse);
    let allNotifications = {
      ...(notifications || {}),
      [message.notificationId || message.messageId]: {
        ...message.data,
        ...(message.notification || {}),
        createdAt: new Date().toISOString(),
      },
    };
    setAllNotifications(allNotifications);
    return database.set(
      NOTIFICATIONS_ARRAY_KEY,
      JSON.stringify(allNotifications),
    );
  }

  function handleNotification(message) {
    PushNotification.localNotification({
      id: message.messageId,
      channelId: 'common',
      smallIcon: 'ic_launcher',
      title: message.notification.title,
      message: message.notification.body,
      userInfo: {
        ...(message.data || {}),
      },
    });
    updateNotitications(message);
  }

  function showLocalNotification(place) {
    PushNotification.localNotification({
      id: String(place.id),
      channelId: 'geopush',
      smallIcon: 'ic_launcher',
      title: `RADAR DE ECONOMIA: ${place.fantasyName}`,
      message: (messages => messages[Date.now() % messages.length])([
        'Você está aqui perto! Que tal aproveitar e pagar menos?',
        'Você está aqui perto! Que tal curtir seus descontos?',
        'Você está aqui perto! Vamos lá economizar?',
      ]),
      userInfo: {
        id: place.id,
        local: true,
      },
    });
  }

  async function handleNotificationOpened(data) {
    if (!data?.notification?.data) {
      return;
    }

    if (data?.notification?.data?.local) {
      return setNeededRoute([
        'PartnerDetails',
        {
          unitId: data.notification.data.id,
        },
      ]);
    }

    dispatchRecord('Abertura de notificação', {
      pushNotificationId: data.notification.notificationId,
    });

    let {url, PaymentOrder} = data.notification.data;

    if (PaymentOrder) {
      return setNeededRoute([
        'Checkout',
        {
          paymentOrderID: PaymentOrder,
        },
      ]);
    }

    if (!url) {
      return;
    }

    if (url.startsWith('https://clube.gazetadopovo.com.br/noticias/')) {
      return setNeededRoute(['NewsDetails', {url}]);
    }

    if (url.startsWith('https://clube.gazetadopovo.com.br/cupons')) {
      return setNeededRoute(['PartnersVouchers']);
    }

    if (url.startsWith('https://clube.gazetadopovo.com.br/momentos/')) {
      return setNeededRoute([
        'Places',
        {
          type: 'moment',
          slug: url.replace(/.+\/([^\/]+)\/?/, '$1'),
        },
      ]);
    }

    if (url.startsWith('https://clube.gazetadopovo.com.br/roteiros/')) {
      return setNeededRoute([
        'Places',
        {
          type: 'guide',
          slug: url.replace(/.+\/([^\/]+)\/?/, '$1'),
        },
      ]);
    }

    if (url.startsWith('https://clube.gazetadopovo.com.br/descontos/')) {
      let {unitSlug, otherCategory} =
        url.match(
          /descontos\/[^\/]*?\/(?<otherCategory>[^\/]*?)\/([^\/]*?\/#_(?<unitSlug>.+))?$/,
        )?.groups || {};
      if (unitSlug) {
        return setNeededRoute(['PlaceDetails', {unitSlug}]);
      }
      if (otherCategory) {
        return setNeededRoute([
          'Places',
          {
            0: 'categorias',
            slug: otherCategory,
          },
        ]);
      }
    }

    setNeededRoute(false);
    Linking.openURL(url).catch(() => {});
  }

  const value = {
    NOTIFICATIONS_ARRAY_KEY,
    neededRoute,
    allNotifications,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default NotificationsProvider;
