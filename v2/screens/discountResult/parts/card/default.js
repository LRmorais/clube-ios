import React from 'react';

import UserCardsList from '../../../../components/userInfo/cardsList';
import {useLayoutContext} from '../../../../hocs/layout';
import {useGlobalStateContext} from '../../../../hocs/globalState';

const DefaultCard = () => {
  const {theme} = useLayoutContext();
  const {userInfo} = useGlobalStateContext();
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const subscription = userInfo?.subscriptions[0];

  const cards = [
    {
      code: String(subscription.subscriptionId),
      color: {
        text: theme.contrastTextColor,
        background: theme.primaryColorShade,
        VIP: {
          background: theme.VIPBackground,
          text: theme.primaryColorShade,
          icon: theme.primaryColorShade,
        },
      },
      isVIP: userInfo.status.vip,
      name: userInfo.name,
      schema: subscription.main ? 'holder' : 'dependent',
    },
    ...(subscription.main ? userInfo.dependents || [] : [])
      .filter(dependent => dependent.id != userInfo.id)
      .map((dependent, i) => ({
        code: String(subscription.subscriptionId) + alphabet[i],
        color: {
          text: theme.contrastTextColor,
          background: theme.secondColorShade,
          VIP: {
            background: theme.VIPBackground,
            text: theme.primaryColorShade,
            icon: theme.primaryColorShade,
          },
        },
        isVIP: false,
        name: dependent.name,
        schema: 'dependent',
      })),
  ];

  return <UserCardsList cards={cards} dotsColor={theme.primaryColorShade} />;
};

export default DefaultCard;
