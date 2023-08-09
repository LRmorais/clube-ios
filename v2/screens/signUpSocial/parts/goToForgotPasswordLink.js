import React from 'react';

import Link from '../../../components/link';
import { useContext } from '../context';

const GoToForgotPasswordLink = () => {
  const {
    screenPalette,
    goToForgotPasswordScreen: handlePress,
  } = useContext();

  return (
    <Link 
      color={screenPalette.forgot_password_link}
      onPress={handlePress}
    >
      Esqueci minha senha
    </Link>
  );
};

export default GoToForgotPasswordLink;
