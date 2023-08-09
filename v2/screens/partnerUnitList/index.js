import React from 'react';

import Provider from './context';
import Screen from './screen';

const PartnerUnitList = props => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default PartnerUnitList;
