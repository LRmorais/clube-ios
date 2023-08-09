import React from 'react';

import Provider from './context';
import Screen from './screen';

const Mural = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Mural;
