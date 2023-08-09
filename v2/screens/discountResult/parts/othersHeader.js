import React from 'react';
import {Text} from 'react-native';

import HeaderBar from '../../../components/headerBar';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const OthersHeader = () => {
  const {theme} = useLayoutContext();
  const {
    vouchers,
    evaluationId,
    thingType,
    thing,
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  const what = {
    event: thing,
    place: thing,
    movieTicket: thing,
  }[thingType];
  // console.log('what:', what);
  const showMessage = [
    [2, 3, 4].includes(what.discountType),
    [1, 2, 3].includes(what.discountTypeLimitBy),
    vouchers && vouchers.list && vouchers.list.length > 0,
  ].every(thing => thing);
  const voucherTypeSingular = {
    2: 'cupom',
    3: 'cupom',
    4: 'link',
  }[what.discountType];
  const voucherTypePlural = {
    2: 'cupons',
    3: 'cupons',
    4: 'links',
  }[what.discountType];
  const period = {
    1: 'dia',
    2: 'mês',
    3: 'ano',
  }[what.discountTypeLimitBy];
  const messageText =
    showMessage &&
    (vouchers.list.length === what.codesByUser
      ? `Você já usou todos os ${voucherTypePlural}, este ${period}`
      : `Você ainda possui ${what.codesByUser - vouchers.list.length} ${
          what.codesByUser - vouchers.list.length === 1
            ? voucherTypeSingular
            : voucherTypePlural
        }, este ${period}`);

  if (evaluationId) {
    return null;
  }

  return (
    <HeaderBar
      contentStyle={styles.content}
      backgroundColor={theme.primaryColor}
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleBackPress,
        },
      ]}>
      {showMessage && (
        <Text style={[styles.message, {color: theme.contrastTextColor}]}>
          {messageText}
        </Text>
      )}
    </HeaderBar>
  );
};

const styles = createStyle(theme => ({
  content: {
    alignItems: 'flex-end',
  },
  message: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
}));

export default OthersHeader;
