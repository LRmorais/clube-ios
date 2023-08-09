import React from 'react';

import Provider from './context';
import Screen from './screen';

const SpecificNewsDetails = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default SpecificNewsDetails;
