import React from 'react';

import CommonAbsoluteButtons from '../../../commonComponents/absoluteButtons';
import {useContext} from '../context';

const AbsoluteButtons = () => {
  const {partnersData} = useContext();

  if (partnersData.length === 0) {
    return null;
  }

  return <CommonAbsoluteButtons />;
};

export default AbsoluteButtons;
