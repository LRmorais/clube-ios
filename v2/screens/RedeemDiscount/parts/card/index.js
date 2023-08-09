import React from 'react';
import { View } from 'react-native';

import SearchBox from './searchBox';
import List from './list';
import { useContext } from '../../context';

const Card = () => {
  const {
    method,
  } = useContext();

  if (method !== 'card') return null;

  return (
    <View>
      <SearchBox />
      <List />
    </View>
  );
};

export default Card;
