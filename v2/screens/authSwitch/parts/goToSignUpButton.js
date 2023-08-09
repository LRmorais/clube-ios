import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { useContext } from '../context';

const GoToSignUpButton = () => {
  const {
    screenPalette,
    goToSignUpScreen: handlePress,
  } = useContext();

  return (
    <FloatingButton
      text="Não sou assinante"
      colors={screenPalette.sign_up_button}
      onPress={handlePress}
    />
  );
};

export default GoToSignUpButton;
