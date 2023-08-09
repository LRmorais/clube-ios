import React from 'react';

import CommonAbsoluteButtons from '../../../commonComponents/absoluteButtons';
import {useContext} from '../context';

const AbsoluteButtons = () => {
  const {events} = useContext();

  if (!events) {
    return null;
  }

  return <CommonAbsoluteButtons />;
};

export default AbsoluteButtons;
