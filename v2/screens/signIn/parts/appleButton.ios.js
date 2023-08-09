import React from 'react';

import { AppleButton as Button } from '@invertase/react-native-apple-authentication';
import { useContext } from '../context';
import { APP_DISTRO } from '../../../constants/app';

const AppleButton = (props) => {
  const {
    signInWithApple: handlePress,
  } = useContext();

  return (
    <Button
      buttonStyle={APP_DISTRO === 'main' ? Button.Style.BLACK : Button.Style.WHITE}
      buttonType={Button.Type.SIGN_IN}
      style={{
        width: props.width,
        height: 44,
      }}
      onPress={handlePress}
    />
  );
};

export default AppleButton;
