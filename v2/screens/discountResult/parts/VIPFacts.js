import React from 'react';

import CommonVIPFacts from '../../../commonComponents/VIPFacts';
import {useContext} from '../context';

const VIPFacts = () => {
  const {thingType, thing, paymentDetails} = useContext();

  if (thingType !== 'place') {
    return null;
  }

  return (
    <CommonVIPFacts
      partner={thing?.partner}
      shadow={paymentDetails ? 'both' : 'none'}
    />
  );
};

export default VIPFacts;
