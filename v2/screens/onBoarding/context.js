import React, {
  createContext,
  useContext as useReactContext,
  useState,
} from 'react';
import {Platform, Alert} from 'react-native';
import RNPermissions from 'react-native-permissions';

import {useGlobalStateContext} from '../../hocs/globalState';
import {usePermissionsContext} from '../../hocs/permissions';
import {useAnalyticsContext} from '../../hocs/analytics';

const Context = createContext();
export const useContext = () => useReactContext(Context);

const Provider = props => {
  const {generalData, updateDeviceLocation} = useGlobalStateContext();
  const {updatePermissionsStatus, request} = usePermissionsContext();
  const {dispatchRecord} = useAnalyticsContext();

  const [index, setIndex] = useState(0);

  function goToNextCard() {
    setIndex(index => index + 1);
  }

  function goToInitialScreen() {
    props.navigation.navigate(generalData ? 'Home' : 'Splash');
  }

  async function requestLocationPermission() {
    let status = await request('location');
    if (status !== RNPermissions.RESULTS.GRANTED) {
      dispatchRecord('Permissão não condedida', {
        value: 'location',
      });
      goToNextCard();
    }

    if(status === RNPermissions.RESULTS.GRANTED){
      dispatchRecord('Permissão concedida', {
        value: 'location',
      });
      updatePermissionsStatus();
      requestBackgroundLocation();
    }
  }

  async function requestBackgroundLocation() {
    updateDeviceLocation();
    if (Platform.OS === 'android') {
      let permission =
        RNPermissions.PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
      await RNPermissions.request(permission);
    }
    goToNextCard();
  }

  async function requestNotificationPermission() {
    let result = await request('notification');
    ({
      [RNPermissions.RESULTS.GRANTED]: () => {
        dispatchRecord('Permissão concedida', {
          value: 'notification',
        });
        updatePermissionsStatus();
        goToInitialScreen();
      },
      [RNPermissions.RESULTS.DENIED]: () =>
        Alert.alert(
          'Recurso bloquado',
          'Recurso de notificação está bloqueada em seu aparelho.',
          [{text: 'Abrir configurações', onPress: RNPermissions.openSettings}],
        ),
      [RNPermissions.RESULTS.BLOCKED]: () =>
        Alert.alert(
          'Recurso bloquado',
          'Recurso de notificação está bloqueada em seu aparelho.',
          [{text: 'Abrir configurações', onPress: RNPermissions.openSettings}],
        ),
      [RNPermissions.RESULTS.UNAVAILABLE]: () =>
        Alert.alert(
          'Recurso indisponível',
          'Notificação não está disponível em seu aparelho.',
          [{text: 'OK'}],
        ),
    }[result]());
  }

  const value = {
    index,
    goToNextCard,
    goToInitialScreen,
    requestLocationPermission,
    requestNotificationPermission,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default Provider;
