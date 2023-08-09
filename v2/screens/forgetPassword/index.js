import React from 'react';

import Provider from './context';
import Screen from './screen';

const ForgetPassword = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default ForgetPassword;
