import React from 'react';

import Provider from './context';
import Screen from './screen';

const PartnerDetails = props => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default PartnerDetails;
