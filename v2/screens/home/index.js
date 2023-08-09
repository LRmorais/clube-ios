import React from 'react';

import Provider from './context';
import Screen from './screen';

const Home = props => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Home;
