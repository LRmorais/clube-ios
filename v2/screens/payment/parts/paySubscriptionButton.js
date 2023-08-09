import React from 'react';

import FloatingButton from '../../../components/button/floating';
import { useContext } from '../context';

const PaySubscriptionButton = () => {
  const {
    screenPalette,
    offers,
    paySubscription: handlePress,
  } = useContext();

  if (offers && offers.error) return null;

  return (
    <FloatingButton
      text="Assinar o Clube"
      colors={screenPalette.subscription_button}
      onPress={handlePress}
    />
  );
};

export default PaySubscriptionButton;
