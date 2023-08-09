import React from 'react';

import Provider from './context';
import Screen from './screen';

const Profile = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Profile;
