import React from 'react';
import PaddingContainer from '../paddingContainer';
import PlaceListItem from './place';
import {View} from 'react-native-animatable';

const PlaceComplexListItem = props => {
  return (
    <View style={{backgroundColor: '#FFFF'}}>
      <PaddingContainer>
        <PlaceListItem {...props} />
      </PaddingContainer>
    </View>
  );
};

export default PlaceComplexListItem;
