import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { useContext } from '../context';

const GoToSignInButton = () => {
  const {
    screenPalette,
    goToSignInScreen: handlePress,
  } = useContext();

  return (
    <FloatingButton
      text="Sou assinante"
      colors={screenPalette.sign_in_button}
      onPress={handlePress}
    />
  );
};

export default GoToSignInButton;
