import React from 'react';
import { Text } from 'react-native';

import SimpleVerticalList from '../../../components/verticalList/simple';
import PaymentMethodListItem from '../../../components/listItem/paymentMethod';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import creditCardBanners from '../../../defaults/creditCardBanners.json';

const List = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    paymentMethods: data,
    selectedID,
    loading,
    selecting,
    getOptionsHOF,
    choosePaymentMethodHOF: handleSelectHOF,
  }  = useContext();

  function renderItem({ item }) {
    return (
      <PaymentMethodListItem
        cardDetails={creditCardBanners[item.payment_type_code] + ' **** ' + item.maskedCardNumber.substr(-4, 4)}
        options={getOptionsHOF(item)}
        selected={selectedID !== null ? item.id === selectedID : !!item.isDefault}
        onSelect={selecting ? handleSelectHOF(item) : undefined}
        color={{
          text: theme.primaryColor,
        }}
      />
    );
  }

  return (
    <SimpleVerticalList
      data={data || []}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={(
        <Text style={[
          styles.noResults,
          { color: theme.textPrimaryColor },
        ]}>
          {loading ? 'Carregando cartões...' : 'Nenhum cartão cadastrado.'}
        </Text>
      )}
    />
  );
};

const styles = createStyle((theme) => ({
  noResults: {
    alignSelf: 'center',
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
    textAlign: 'center',
  },
}));

export default List;
