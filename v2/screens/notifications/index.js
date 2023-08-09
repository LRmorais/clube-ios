import React from 'react';

import Provider from './context';
import Screen from './screen';

const Notifications = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Notifications;
