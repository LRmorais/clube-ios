import React from 'react';

import Provider from './context';
import Screen from './screen';

const DiscountRequest = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default DiscountRequest;
