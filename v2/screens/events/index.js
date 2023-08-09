import React from 'react';

import Provider from './context';
import Screen from './screen';

const Events = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Events;
