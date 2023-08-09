import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { useContext } from '../context';

const GoToPaymentButton = () => {
  const {
    screenPalette,
    signUp: handlePress,
  } = useContext();

  return (
    <FloatingButton
      text="Ir para o pagamento"
      colors={screenPalette.payment_button}
      onPress={handlePress}
    />
  );
};

export default GoToPaymentButton;
