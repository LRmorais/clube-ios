import React from 'react';

import Provider from './context';
import Screen from './screen';

const Uses = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Uses;
