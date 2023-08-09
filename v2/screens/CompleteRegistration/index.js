import React from 'react';

import Provider from './context';
import Screen from './screen';

export const CompleteRegistration = props => (
  <Provider {...props}>
    <Screen />
  </Provider>
);
