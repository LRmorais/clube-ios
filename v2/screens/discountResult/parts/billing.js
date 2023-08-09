import React from 'react';

import SimpleVerticalList from '../../../components/verticalList/simple';
import BillingListItem from '../../../components/listItem/billing';
import { formatPrice } from '../../../utils/data';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Billing = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    paymentDetails,
  } = useContext();
  const fullValue = paymentDetails?.order?.totalValue;
  const finalValue = paymentDetails?.order?.discountedValue;

  const data = [
    {
      description: 'Subtotal',
      value: formatPrice(fullValue),
    },
    {
      description: 'Desconto do Clube',
      value: `${formatPrice(fullValue - finalValue)} (-${((1 - finalValue / fullValue) * 100).toFixed(0)}%)`,
    },
    {
      description: 'Total',
      value: formatPrice(finalValue),
      topSpacing: true,
      textBold: true,
    },
  ];

  function renderItem({ item }) {
    return (
      <BillingListItem
        {...item}
        color={theme.textPrimaryColor}
      />
    );
  }

  return (
    <SimpleVerticalList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => String(index)}
      showSeparator
      separatorColor="transparent"
      separatorSize={1}
    />
  );
};

export default Billing;
