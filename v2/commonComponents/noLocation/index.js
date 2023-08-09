import React from 'react';
import RNPermissions from 'react-native-permissions';
import {Platform} from 'react-native';

import Box from '../../components/box';
import PaddingContainer from '../../components/paddingContainer';
import MessageBox from '../../components/messageBox';
import {useGlobalStateContext} from '../../hocs/globalState';
import {usePermissionsContext} from '../../hocs/permissions';
import {useLayoutContext} from '../../hocs/layout';

const NoLocation = () => {
  const {locationError: error, updateDeviceLocation} = useGlobalStateContext();
  const {unlock, updatePermissionsStatus, request} = usePermissionsContext();
  const {theme} = useLayoutContext();

  function handlePermissionPress() {
    unlock('location');
  }
  // ------ teste ------

  async function requestLocationPermission() {
    let status = await request('location');
    if (status !== RNPermissions.RESULTS.GRANTED) {
      // return console.log('ok aqui');
      updatePermissionsStatus();
      requestBackgroundLocation();
    } else {
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
  }
  // ------ teste ------
  const propsByError = {
    permission: {
      text: 'Ative os serviços de Localização para melhores indicações. Pressione aqui.',
      handlePress: handlePermissionPress,
    },
    location: {
      text: 'Sinal de GPS fraco :(',
      handlePress: requestLocationPermission,
    },
  }[error];

  if (!error) {
    return false;
  }

  return (
    <Box>
      <PaddingContainer>
        <MessageBox
          icon="no-location"
          color={{
            background: theme.red__main,
            icon: theme.contrastTextColor,
            text: theme.contrastTextColor,
          }}
          onPress={propsByError.handlePress}>
          {propsByError.text}
        </MessageBox>
      </PaddingContainer>
    </Box>
  );
};

export default NoLocation;
