import React from 'react';

import { useContext } from '../context';
import { View } from 'react-native';

const Line = (props) => {
  const {
    screenPalette,
  } = useContext();

  return ( 
    <View  
        style={{height: 1, backgroundColor: '##262061'}}
    />

  );
};

export default Line;
