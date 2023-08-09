import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { useContext } from '../context';

const SignInButton = () => {
  const {
    screenPalette,
    signIn: handlePress,
  } = useContext();

  return (
    <FloatingButton
      text="Entrar"
      colors={screenPalette.sign_in_button}
      onPress={handlePress}
    />
  );
};

export default SignInButton;
