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
      colors={screenPalette.sign_up_button}
      text="Não sou assinante"
      onPress={handlePress}
    />
  );
};

export default GoToSignUpButton;
