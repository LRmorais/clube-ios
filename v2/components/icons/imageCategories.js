import React, {useState} from 'react';
import {Image, View} from 'react-native';
import createStyle, {theme} from '../../utils/style';

const ImageCategories = props => {
  const sourceImage = props.caminho;
  return (
    <View>
      <Image style={styles.imagemCat} source={sourceImage} />
    </View>
  );
};

const styles = createStyle(theme => {
  return {
    imagemCat: {
      width: 110,
      height: 64,
      overflow: 'hidden',
      aspectRatio: 3 / 2,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
  };
});

export default ImageCategories;
