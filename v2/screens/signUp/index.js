import React from 'react';

import Provider from './context';
import Screen from './screen';

const SignUp = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default SignUp;
