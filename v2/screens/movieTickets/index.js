import React from 'react';

import Provider from './context';
import Screen from './screen';

const MovieTickets = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default MovieTickets;
