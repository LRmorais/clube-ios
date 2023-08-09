import React from 'react';

import Provider from './context';
import Screen from './screen';

const DiscountResult = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default DiscountResult;
