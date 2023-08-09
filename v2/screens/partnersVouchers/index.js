import React from 'react';

import Provider from './context';
import Screen from './screen';

const PartnersVouchers = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default PartnersVouchers;
