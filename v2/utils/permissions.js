import {Platform, Alert} from 'react-native';
import RNPermissions from 'react-native-permissions';

export const checkLocation = async (
  grantedFn,
  deniedFn,
  blockedFn,
  unavailableFn,
) => {
  let permission = {
    ios: RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  }[Platform.OS];
  let result = await RNPermissions.check(permission);
  ({
    [RNPermissions.RESULTS.GRANTED]: grantedFn,
    [RNPermissions.RESULTS.DENIED]: deniedFn,
    [RNPermissions.RESULTS.BLOCKED]: blockedFn,
    [RNPermissions.RESULTS.UNAVAILABLE]: unavailableFn,
  }[result]());
};

export const requestLocation = async (grantedFn, deniedFn) => {
  let permission = {
    ios: RNPermissions.PERMISSIONS.IOS.LOCATION_ALWAYS,
    android: RNPermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  }[Platform.OS];
  let result = await RNPermissions.request(permission);
  ({
    [RNPermissions.RESULTS.GRANTED]: grantedFn,
    [RNPermissions.RESULTS.DENIED]: deniedFn,
    [RNPermissions.RESULTS.BLOCKED]: () =>
      Alert.alert(
        'Recurso bloquado',
        'Recurso de localização está bloqueado em seu aparelho.',
        [{text: 'Abrir configurações', onPress: RNPermissions.openSettings}],
      ),
    [RNPermissions.RESULTS.UNAVAILABLE]: () =>
      Alert.alert(
        'Recurso indisponível',
        'Localização não está disponível em seu aparelho.',
        [{text: 'OK'}],
      ),
  }[result]());
};

export const checkCamera = async (
  grantedFn,
  deniedFn,
  blockedFn,
  unavailableFn,
) => {
  let permission = {
    ios: RNPermissions.PERMISSIONS.IOS.CAMERA,
    android: RNPermissions.PERMISSIONS.ANDROID.CAMERA,
  }[Platform.OS];
  let result = await RNPermissions.check(permission);
  ({
    [RNPermissions.RESULTS.GRANTED]: grantedFn,
    [RNPermissions.RESULTS.DENIED]: deniedFn,
    [RNPermissions.RESULTS.BLOCKED]: blockedFn,
    [RNPermissions.RESULTS.UNAVAILABLE]: unavailableFn,
  }[result]());
};

export const requestCamera = async (grantedFn, deniedFn) => {
  let permission = {
    ios: RNPermissions.PERMISSIONS.IOS.CAMERA,
    android: RNPermissions.PERMISSIONS.ANDROID.CAMERA,
  }[Platform.OS];
  let result = await RNPermissions.request(permission);
  ({
    [RNPermissions.RESULTS.GRANTED]: grantedFn,
    [RNPermissions.RESULTS.DENIED]: deniedFn,
    [RNPermissions.RESULTS.BLOCKED]: () =>
      Alert.alert(
        'Recurso bloqueado',
        'Recurso de câmera está bloqueado em seu aparelho.',
        [{text: 'Abrir configurações', onPress: RNPermissions.openSettings}],
      ),
    [RNPermissions.RESULTS.UNAVAILABLE]: () =>
      Alert.alert(
        'Recurso indisponível',
        'Câmera não está disponível em seu aparelho.',
        [{text: 'OK'}],
      ),
  }[result]());
};
