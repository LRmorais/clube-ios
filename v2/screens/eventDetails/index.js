import React from 'react';

import Provider from './context';
import Screen from './screen';

const EventDetails = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default EventDetails;
