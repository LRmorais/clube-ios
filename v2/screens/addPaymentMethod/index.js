import React from 'react';

import Provider from './context';
import Screen from './screen';

const AddPaymentMethod = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default AddPaymentMethod;
