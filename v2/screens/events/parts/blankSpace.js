import React from 'react';

import Spacer from '../../../components/spacer';
import {useContext} from '../context';

const BlankSpace = () => {
  const {events} = useContext();

  if (!events) {
    return null;
  }

  return <Spacer size={11} fixedSize />;
};

export default BlankSpace;
