import React from 'react';

import Provider from './context';
import Screen from './screen';

const PartnerVoucherDetails = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default PartnerVoucherDetails;
