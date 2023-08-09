import React from 'react';

import CommonAbsoluteButtons from '../../../commonComponents/absoluteButtons';
import {useContext} from '../context';

const AbsoluteButtons = () => {
  const {unit} = useContext();

  return (
    <CommonAbsoluteButtons
      from={{
        type: 'place',
        id: unit.unitId,
      }}
    />
  );
};

export default AbsoluteButtons;
