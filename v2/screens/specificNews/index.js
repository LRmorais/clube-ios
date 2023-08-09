import React from 'react';

import Provider from './context';
import Screen from './screen';

const SpecificNews = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default SpecificNews;
