import React from 'react';

import Provider from './context';
import Screen from './screen';

const NewsDetails = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default NewsDetails;
