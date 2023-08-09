import React from 'react';

import Provider from './context';
import Screen from './screen';

const Search = props => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Search;
