import React from 'react';

import CommonAbsoluteButtons from '../../../commonComponents/absoluteButtons';
import {useContext} from '../context';

const AbsoluteButtons = () => {
  const {eventDetail} = useContext();

  return (
    <CommonAbsoluteButtons
      from={{
        type: 'event',
        id: eventDetail.id,
      }}
    />
  );
};

export default AbsoluteButtons;
