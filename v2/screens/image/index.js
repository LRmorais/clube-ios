import React from 'react';

import Provider from './context';
import Screen from './screen';

const Image = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Image;
