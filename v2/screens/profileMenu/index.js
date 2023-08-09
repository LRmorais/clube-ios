import React from 'react';

import Provider from './context';
import Screen from './screen';

const ProfileMenu = props => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default ProfileMenu;
