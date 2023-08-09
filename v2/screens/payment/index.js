import React from 'react';

import Provider from './context';
import Screen from './screen';

const Payment = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Payment;
