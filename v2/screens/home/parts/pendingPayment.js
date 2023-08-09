import React from 'react';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import PlaceListItem from '../../../components/listItem/place';
import { formatPrice } from '../../../utils/data';
import { useLayoutContext } from '../../../hocs/layout';
import { useGlobalStateContext } from '../../../hocs/globalState';
import { useContext } from '../context';
import { ASSET_PREFIX } from '../../../constants/env';

const PendingPayment = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    generalData,
  } = useGlobalStateContext();
  const {
    pendingPayments,
    goToCheckoutScreenHOF,
    goToUsesScreen,
  } = useContext();
  const firstPending = (pendingPayments || [])[0];

  if (!firstPending) return null;

  const image = ASSET_PREFIX + firstPending.partnerUnit.Partner.logo;
  const isVIP = [2, 3].includes(firstPending.partnerUnit.Partner.partnerType);
  const rating = Number(generalData.unitsByID[firstPending.partnerUnit.id]?.score?.scoreClient);
  const handlePress = (
    pendingPayments?.length === 1
      ? goToCheckoutScreenHOF(firstPending)
      : goToUsesScreen
  );

  return (
    <Box
      title="Pagamentos em aberto"
      titleColor={theme.contrastTextColor}
      background={theme.green__main}
    >
      <PaddingContainer>
        <PlaceListItem
          id={firstPending.partnerUnit.id}
          image={image}
          title={firstPending.partnerUnit.fantasyName}
          isVIP={isVIP}
          rating={rating || undefined}
          onPress={handlePress}
          iconsSize="medium"
          icons={[
            {
              icon: 'dollar',
              color: {
                icon: theme.contrastTextColor,
                label: theme.contrastTextColor,
              },
              label: formatPrice(firstPending.discountedValue),
            },
          ]}
          color={{
            image: theme.greyishBackground,
            title: theme.contrastTextColor,
            VIP: {
              background: theme.VIPBackground,
              icon: theme.primaryColor,
            },
            rating: {
              icon: theme.VIPBackground,
              text: theme.VIPBackground,
              action: theme.primaryColor,
            },
          }}
        />
      </PaddingContainer>
    </Box>
  );
};

export default PendingPayment;
