import React from 'react';
import { Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import creditCardBanners from '../../../defaults/creditCardBanners.json';

const PaymentMethod = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    paymentDetails,
  } = useContext();
  const bannerCode = paymentDetails?.method?.payment_type_code;
  const lastFourDigits = paymentDetails?.method?.maskedCardNumber.substr(-4, 4);

  if (!paymentDetails) return null;

  return (
    <Text style={[
      styles.content,
      { color: theme.textPrimaryColor },
    ]}>
      {creditCardBanners[bannerCode] + ' **** ' + lastFourDigits}
    </Text>
  );
};

const styles = createStyle((theme) => ({
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
}));

export default PaymentMethod;
