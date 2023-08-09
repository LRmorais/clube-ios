import React from 'react';

import Provider from './context';
import Screen from './screen';

const News = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default News;
