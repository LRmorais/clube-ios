import React from 'react';

import VoucherCardsList from '../../../../components/voucherCard/list';
import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../../context';

const LinkCard = () => {
  const {theme} = useLayoutContext();
  const {vouchers, loadingVouchers: loading, getVouchers} = useContext();

  const data =
    vouchers &&
    vouchers?.list.map(voucher => ({
      color: {
        background: theme.secondColorShade,
        text: theme.primaryColor,
        dots: theme.secondColorShade,
      },
      text: {
        top: 'Utilize o seguinte link para receber seu desconto:',
        copyable: voucher.value,
        main: 'Copiar link',
        bottom: 'Não compartilhe este link, por gentileza.',
      },
    }));
  if (vouchers && vouchers.message) {
    data.unshift({
      color: {
        background: theme.secondColorShade,
        text: theme.primaryColor,
        dots: theme.secondColorShade,
      },
      text: {
        bottom: vouchers.message,
      },
    });
  }

  const waitingData = [
    {
      color: {
        background: theme.secondColorShade,
        text: theme.primaryColor,
        dots: theme.secondColorShade,
      },
      loading,
      text: {
        bottom: loading ? 'Obtendo link...' : 'Pressione para obter link',
      },
      onPress: loading ? undefined : getVouchers,
    },
  ];

  return (
    <VoucherCardsList
      cards={data || waitingData}
      dotsColor={theme.secondColorShade}
    />
  );
};

export default LinkCard;
