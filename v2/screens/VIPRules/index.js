import React from 'react';

import Provider from './context';
import Screen from './screen';

const VIPRules = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default VIPRules;
