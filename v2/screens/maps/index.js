import React from 'react';

import Provider from './context';
import Screen from './screen';

const Maps = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Maps;
