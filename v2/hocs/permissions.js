import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, Alert, Linking } from 'react-native';
import RNPermissions from 'react-native-permissions';

import database from '../helpers/database';

const Context = createContext();
export const usePermissionsContext = () => useContext(Context);

const LOCATION_RESTRICTION_KEY = 'do-not-use-location';
const NOTIFICATION_RESTRICTION_KEY = 'do-not-use-notification';
const GEOPUSH_RESTRICTION_KEY = 'do-not-use-geopush';

const PermissionsProvider = (props) => {
  const [permissionsStatus, setPermissionsStatus] = useState(null);
  const keyByResource = {
    location: LOCATION_RESTRICTION_KEY,
    notification: NOTIFICATION_RESTRICTION_KEY,
    geopush: GEOPUSH_RESTRICTION_KEY,
  };
  const nameByResource = {
    location: 'localização',
    notification: 'notificação',
  };

  useEffect(() => {
    updatePermissionsStatus();
  }, []);

  async function updatePermissionsStatus() {
    let [
      location,
      notification,
    ] = await Promise.all([
      checkLocation(),
      checkNotification(),
    ]);
    let geopush = await checkGeopush(location, notification);
    setPermissionsStatus({
      location,
      notification,
      geopush,
    });
  }

  function blockedFeedback(resource) {
    Alert.alert(
      'Recurso bloqueado',
      `O recurso de ${nameByResource[resource]} está bloquado em seu aparelho.`,
      [
        {
          text: 'Abrir configurações',
          onPress: Linking.openSettings,
        },
        {
          text: 'OK',
        },
      ]
    );
  }

  function unavailableFeedback(resource) {
    Alert.alert(
      'Recurso indisponível',
      `O recurso de ${nameByResource[resource]} não está disponível em seu aparelho.`,
      [
        {
          text: 'OK',
        },
      ]
    );
  }

  function giveFeedbackIfNeeded(resource, status) {
    ({
      [RNPermissions.RESULTS.GRANTED]: () => {},
      [RNPermissions.RESULTS.DENIED]: () => {},
      [RNPermissions.RESULTS.BLOCKED]: blockedFeedback,
      [RNPermissions.RESULTS.UNAVAILABLE]: unavailableFeedback,
    })[status](resource);
  }

  async function checkLocation() {
    let permissions = {
      ios: [
        RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS,
        RNPermissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ],
      android: [
        RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
    }[Platform.OS];
    let status = await Promise.all(permissions.map(RNPermissions.check));
    if (!status.includes(RNPermissions.RESULTS.GRANTED)) return false;

    let restriction = await database.get(LOCATION_RESTRICTION_KEY);
    if (restriction) return false;

    return true;
  }

  async function checkNotification() {
    let { status } = await RNPermissions.checkNotifications();
    if (status !== RNPermissions.RESULTS.GRANTED) return false;

    let restriction = await database.get(NOTIFICATION_RESTRICTION_KEY);
    if (restriction) return false;

    return true;
  }

  async function checkGeopush(...params) {
    let precedingPermissions = await (
      params.length > 0
        ? params
        : Promise.all([
          checkLocation(),
          checkNotification(),
        ])
    );
    if (precedingPermissions.some((permission) => !permission)) return false;

    let restriction = await database.get(GEOPUSH_RESTRICTION_KEY);
    if (restriction) return false;

    return true;
  }

  async function requestLocation() {
    let permissions = {
      ios: [
        RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS,
        RNPermissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      ],
      android: [
        RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ],
    }[Platform.OS];
    let result;
    for (let permission of permissions) {
      let status = await RNPermissions.request(permission);
      if (!result && result !== RNPermissions.RESULTS.GRANTED) result = status;
    }
    giveFeedbackIfNeeded('location', result);
    return result;
  }

  async function requestNotification() {
    let { status } = await RNPermissions.requestNotifications([
      'alert',
      'sound',
      'carPlay',
    ]);
    giveFeedbackIfNeeded('notification', status);
    return status;
  }

  async function requestGeopush() {
    let locationStatus = await requestLocation();
    if (locationStatus !== RNPermissions.RESULTS.GRANTED) return locationStatus;

    let notificationStatus = await requestNotification();
    if (notificationStatus !== RNPermissions.RESULTS.GRANTED) return notificationStatus;

    return RNPermissions.RESULTS.GRANTED;
  }

  function check(resource) {
    return ({
      location: checkLocation,
      notification: checkNotification,
      geopush: checkGeopush,
    })[resource]();
  }

  async function request(resource) {
    let status = await ({
      location: requestLocation,
      notification: requestNotification,
      geopush: requestGeopush,
    })[resource]();
    updatePermissionsStatus();
    return status;
  }

  async function lock(resource) {
    await database.set(keyByResource[resource], '1');
    updatePermissionsStatus();
  }

  async function unlock(resource) {
    await database.remove(keyByResource[resource]);
    let status = await check(resource);
    if (!status) {
      let requesting = await request(resource);
      updatePermissionsStatus();
      if (requesting !== RNPermissions.RESULTS.GRANTED) return false;
    }

    updatePermissionsStatus();
    return true;
  }

  const value = {
    permissionsStatus,
    updatePermissionsStatus,
    check,
    request,
    lock,
    unlock,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

export default PermissionsProvider;
