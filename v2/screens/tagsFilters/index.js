import React from 'react';

import Provider from './context';
import Screen from './screen';

const TagsFilters = (props) => (
  <Provider {...props}>
    <Screen />
  </Provider>
);

export default TagsFilters;
