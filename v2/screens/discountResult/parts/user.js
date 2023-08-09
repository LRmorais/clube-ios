import React from 'react';

import SumUserInfo from '../../../components/userInfo/sum';
import Spacer from '../../../components/spacer';

import {useLayoutContext} from '../../../hocs/layout';
import {useGlobalStateContext} from '../../../hocs/globalState';
import {useContext} from '../context';

const User = () => {
  const {theme} = useLayoutContext();
  const {userInfo} = useGlobalStateContext();
  const {evaluationId, paymentDetails, thingType} = useContext();

  if (!evaluationId || paymentDetails || thingType === 'movieTicket') {
    return null;
  }

  return (
    <>
      <SumUserInfo
        text={{
          primary: userInfo.name,
          secondary: '#' + userInfo?.subscriptions[0].subscriptionId,
        }}
        isVIP={userInfo.status.vip}
        image={{uri: userInfo.img}}
        color={{
          image: theme.secondColorShade,
          text: {
            primary: theme.textPrimaryColor,
            secondary: theme.textPrimaryColor,
          },
          VIP: {
            background: theme.VIPBackground,
            text: theme.VIPBackground,
            icon: theme.primaryColorShade,
          },
        }}
      />
      <Spacer size={3} fixedSize setMinSize />
    </>
  );
};

export default User;
