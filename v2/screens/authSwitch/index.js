import React from 'react';

import Provider from './context';
import Screen from './screen';

const AuthSwitch = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default AuthSwitch;
