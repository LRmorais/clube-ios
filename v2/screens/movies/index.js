import React from 'react';

import Provider from './context';
import Screen from './screen';

const MoviesList = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default MoviesList;
