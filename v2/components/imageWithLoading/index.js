import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {createImageProgress} from 'react-native-image-progress';
import FastImage from 'react-native-fast-image';

const Image = createImageProgress(FastImage);

// need to finish loading interaction
const ImageWithLoading = props => {
  const [progress, setProgress] = useState(null);

  function handleLoadStart() {
    setProgress(0);
  }

  function handleProgress(e) {
    setProgress(e.nativeEvent.loaded / e.nativeEvent.total);
  }

  function handleLoadEnd() {
    setProgress(null);
  }

  return (
    <Image
      {...props}
      style={StyleSheet.flatten(props.containerStyle)}
      imageStyle={StyleSheet.flatten(props?.style)}
      threshold={200}
      onLoadStart={handleLoadStart}
      onProgress={handleProgress}
      onLoadEnd={handleLoadEnd}
      renderIndicator={() => null}
    />
  );
};

export default ImageWithLoading;
