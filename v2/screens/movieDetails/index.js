import React from 'react';

import Provider from './context';
import Screen from './screen';

const MovieDetails = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default MovieDetails;
