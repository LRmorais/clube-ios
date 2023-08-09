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
      colors={screenPalette.subscriber_button}
      text="Já sou assinante"
      onPress={handlePress}
    />
  );
};

export default GoToSignInButton;
