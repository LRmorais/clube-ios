import React from 'react';

import Provider from './context';
import Screen from './screen';

const RecommendToFriends = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default RecommendToFriends;
