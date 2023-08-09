import React from 'react';

import Provider from './context';
import Screen from './screen';

const PolicyAndPrivacy = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default PolicyAndPrivacy;
