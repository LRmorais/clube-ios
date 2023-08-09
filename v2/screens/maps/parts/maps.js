import React from 'react';

import CommonMaps from '../../../commonComponents/maps';
import { useContext } from '../context';

const Maps = () => {
  const {
    filteredData,
  } = useContext();

  return (
    <CommonMaps placesIDs={filteredData.map((place) => place.id)} />
  );
};

export default Maps;
