import React from 'react';
import { Text } from 'react-native'

import Accordion from '../../../components/accordion';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const SecondSwitchGroup = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    goToPaymentMethodsScreen: handlePaymentMethodsPress,
  } = useContext();

  const data = [
    {
      title: 'Meus cartões',
      content: 'Gerencie seus cartões e métodos de pagamentos pelo app.',
      color: {
        title: theme.textPrimaryColor,
        content: theme.textPrimaryColor,
      },
      value: 'paymentMethods',
      link: true,
      onPress: handlePaymentMethodsPress,
    },
  ];

  return (
    <Accordion data={data} />
  );
};

export default SecondSwitchGroup;
