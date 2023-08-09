import React from 'react';

import Provider from './context';
import Screen from './screen';

const Settings = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Settings;
