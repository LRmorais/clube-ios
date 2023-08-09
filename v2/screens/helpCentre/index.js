import React from 'react';

import Provider from './context';
import Screen from './screen';

const HelpCentre = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default HelpCentre;

