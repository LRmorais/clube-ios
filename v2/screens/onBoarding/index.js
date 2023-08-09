import React from 'react';

import Provider from './context';
import Screen from './screen';

const OnBoarding = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default OnBoarding;
