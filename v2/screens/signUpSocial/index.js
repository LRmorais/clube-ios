import React from 'react';

import Provider from './context';
import Screen from './screen';

const SignUpSocial = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default SignUpSocial;
