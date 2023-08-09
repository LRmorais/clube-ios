import React from 'react';

import Provider from './context';
import Screen from './screen';

const Evaluation = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default Evaluation;
