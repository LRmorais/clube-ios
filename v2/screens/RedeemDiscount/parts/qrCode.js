import React, { useState } from 'react';

import QRCodeScanner from '../../../components/qrCodeScanner';
import { requestCamera } from '../../../utils/permissions';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const QRCode = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    method,
    handleQRCodeRead: handleRead,
  } = useContext();
  const [status, setStatus] = useState();

  function requestCameraPermission() {
    requestCamera(
      () => setStatus('granted'),
      () => setStatus('denied')
    );
  }

  const blockedMessage = {
    children: 'O recurso de câmera está bloqueado. Clique aqui para dar permissão.',
    color: {
      background: theme.red__main,
      text: theme.contrastTextColor,
    },
    onPress: requestCameraPermission,
  };

  const deniedMessage = {
    children: 'O recurso de câmera está bloqueado. Clique aqui para dar permissão.',
    color: {
      background: theme.red__main,
      text: theme.contrastTextColor,
    },
    onPress: requestCameraPermission,
  };

  const unavailableMessage = {
    children: 'A câmera está indisponível em seu aparelho.',
    color: {
      background: theme.red__main,
      text: theme.contrastTextColor,
    },
  };

  const noInternetMessage = {
    icon: 'no-internet',
    children: 'Você não está conectado à internet.',
    color: {
      background: theme.red__main,
      text: theme.contrastTextColor,
    },
  };

  if (method !== 'qrcode') return null;

  return (
    <QRCodeScanner
      onRead={handleRead}
      status={status}
      backgroundColor={theme.blackBackground}
      blockedMessage={blockedMessage}
      deniedMessage={deniedMessage}
      unavailableMessage={unavailableMessage}
      noInternetMessage={noInternetMessage}
    />
  );
};

export default QRCode;
