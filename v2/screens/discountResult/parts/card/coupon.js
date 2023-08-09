import React from 'react';
import moment from 'moment';

import VoucherCardsList from '../../../../components/voucherCard/list';
import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../../context';

const CouponCard = () => {
  const {theme} = useLayoutContext();
  const {vouchers, loadingVouchers: loading, getVouchers} = useContext();

  const data =
    vouchers &&
    vouchers?.list.map(voucher => ({
      color: {
        background: theme.primaryColorShade,
        text: theme.contrastTextColor,
      },
      text: {
        top: `Cupom gerado dia ${moment(voucher.requestDateTime).format(
          'DD/MM/YYYY[, às] HH[h]mm',
        )}.`,
        main: voucher.value,
        bottom: 'Use esse código para receber o benefício.',
      },
    }));
  if (vouchers && vouchers.message) {
    data.unshift({
      color: {
        background: theme.primaryColorShade,
        text: theme.contrastTextColor,
      },
      text: {
        bottom: vouchers.message,
      },
    });
  }

  const waitingData = [
    {
      color: {
        background: theme.primaryColorShade,
        text: theme.contrastTextColor,
      },
      loading,
      text: {
        bottom: loading ? 'Obtendo cupons...' : 'Pressione para obter cupons',
      },
      onPress: loading ? undefined : getVouchers,
    },
  ];

  return (
    <VoucherCardsList
      cards={data || waitingData}
      dotsColor={theme.primaryColorShade}
    />
  );
};

export default CouponCard;
