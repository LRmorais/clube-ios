import React from 'react';

import CommonMaps from '../../../commonComponents/maps';
import {useContext} from '../context';

const Maps = () => {
  const {viewMode, partnersData} = useContext();

  if (viewMode !== 'maps') {
    return null;
  }

  return <CommonMaps data={partnersData} />;
};

export default Maps;
