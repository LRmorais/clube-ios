import React from 'react';
// import moment from 'moment';

import PartnerVoucherHead from '../../../components/head/partnerVoucher';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import { ASSET_PREFIX } from '../../../constants/env';

const Head = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    sendLinkRecord: handleLinkPress,
  } = useContext();

  const metaText = [
    // (
    //   !data.userStuff
    //     ? {
    //       [data.available]: `${data.available} cupons disponíveis.`,
    //       0: 'Nenhum cupom disponível.',
    //       1: 'Um cupom disponível.',
    //     }[data.available]
    //     : ''
    // ),
    // moment(data.validDate).format('[Válido até] DD/MM/YYYY'),
  ].join('\n');

  return (
    <PartnerVoucherHead
      image={ASSET_PREFIX + data.image}
      text={{
        title: data.title,
        description: data.description,
      }}
      meta={metaText ? {
        color: theme.secondColor,
        text: metaText,
      } : undefined}
      onLinkPress={handleLinkPress}
      color={{
        background: theme.primaryColor,
        description: {
          background: theme.primaryColorShade,
          text: theme.contrastTextColor,
        },
        text: theme.contrastTextColor,
      }}
    />
  );
};

export default Head;
