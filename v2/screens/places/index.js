import React from 'react';

import Provider from './context';
import Screen from './screen';

const Places = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Places;
