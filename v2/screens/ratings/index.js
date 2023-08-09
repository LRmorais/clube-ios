import React from 'react';

import Provider from './context';
import Screen from './screen';

const Ratings = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Ratings;
