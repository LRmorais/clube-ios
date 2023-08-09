import React from 'react';

import Provider from './context';
import Screen from './screen';

const IndicateEstablishment = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default IndicateEstablishment;
