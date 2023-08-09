import React from 'react';

import Provider from './context';
import Screen from './screen';

const Economy = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Economy;
