import React from 'react';

import Provider from './context';
import Screen from './screen';

const ConvertedFriends = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default ConvertedFriends;
