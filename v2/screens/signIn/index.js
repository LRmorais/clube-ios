import React from 'react';

import Provider from './context';
import Screen from './screen';

const SignIn = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default SignIn;
