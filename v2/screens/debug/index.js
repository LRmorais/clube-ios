import React from 'react';

import Provider from './context';
import Screen from './screen';

const Debug = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Debug;
