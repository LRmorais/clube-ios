import React, {useState, useLayoutEffect} from 'react';
import {LogBox, View, Image} from 'react-native';
import RNPermissions from 'react-native-permissions';
import netInfo from '@react-native-community/netinfo';
import {RNCamera} from 'react-native-camera';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import MessageBox from '../messageBox';
import createStyle from '../../utils/style';
import {checkCamera} from '../../utils/permissions';

LogBox.ignoreLogs([
  "The 'captureAudio' property set on RNCamera instance but 'RECORD_AUDIO'",
]);

const QRCodeScanner = props => {
  const {BLOCKED, DENIED, GRANTED, UNAVAILABLE} = RNPermissions.RESULTS;
  const [permissionResult, setPermissionResult] = useState(null);
  const [canFetch, setCanFetch] = useState(null);
  const messagePropsByResult = {
    [BLOCKED]: props.blockedMessage,
    [DENIED]: props.deniedMessage,
    [UNAVAILABLE]: props.unavailableMessage,
  }[permissionResult];

  useLayoutEffect(() => {
    let unsubscribe = netInfo.addEventListener(state => {
      setCanFetch(state.isConnected && state.isInternetReachable);
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    checkCamera(
      () => setPermissionResult(GRANTED),
      () => setPermissionResult(DENIED),
      () => setPermissionResult(BLOCKED),
      () => setPermissionResult(UNAVAILABLE),
    );
  }, [props.status]);

  if (messagePropsByResult) {
    return (
      <View
        style={[
          styles.messageContainer,
          {backgroundColor: props.backgroundColor},
        ]}>
        <PaddingContainer>
          <MessageBox {...messagePropsByResult} />
        </PaddingContainer>
      </View>
    );
  }

  if (!canFetch && props.noInternetMessage) {
    return (
      <View
        style={[
          styles.messageContainer,
          {backgroundColor: props.backgroundColor},
        ]}>
        <PaddingContainer>
          <MessageBox {...props.noInternetMessage} />
        </PaddingContainer>
      </View>
    );
  }

  if (permissionResult === GRANTED) {
    return (
      <View style={styles.cameraContainer}>
        <RNCamera
          style={styles.camera}
          onBarCodeRead={props.onRead}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />
        <Image
          style={styles.cameraMask}
          source={require('../../images/vectors/qrCodeMask.png')}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.messageContainer,
        {backgroundColor: props.backgroundColor},
      ]}
    />
  );
};

QRCodeScanner.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  blockedMessage: PropTypes.object,
  deniedMessage: PropTypes.object,
  noInternetMessage: PropTypes.object,
  onRead: PropTypes.func.isRequired,
  status: PropTypes.any,
  unavailableMessage: PropTypes.object,
};

const styles = createStyle({
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  cameraMask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default QRCodeScanner;
