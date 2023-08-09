/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {useLayoutContext} from '../../../hocs/layout';

const Skeleton = () => {
  const {theme} = useLayoutContext();
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={[styles.container, {backgroundColor: theme.greyishBackground}]}>
      <SkeletonPlaceholder highlightColor={theme.secondColorShade} speed={1500}>
        <View style={{alignItems: 'flex-start', marginTop: 35, marginLeft: 30}}>
          <View style={{width: windowWidth / 1.3, height: 30}} />
          <View style={{width: windowWidth / 2, height: 30, marginTop: 10}} />
          <View style={{width: windowWidth / 2.5, height: 30, marginTop: 10}} />
          <View style={{width: windowWidth / 4, height: 30, marginTop: 10}} />
        </View>
        <View style={{alignItems: 'flex-start', marginTop: 35, marginLeft: 30}}>
          <View style={{width: windowWidth / 1.3, height: 30}} />
          <View style={{width: windowWidth / 2, height: 30, marginTop: 10}} />
          <View style={{width: windowWidth / 2.5, height: 30, marginTop: 10}} />
          <View style={{width: windowWidth / 4, height: 30, marginTop: 10}} />
        </View>
        <View style={{alignItems: 'flex-start', marginTop: 35, marginLeft: 30}}>
          <View style={{width: windowWidth / 1.3, height: 30}} />
          <View style={{width: windowWidth / 2, height: 30, marginTop: 10}} />
          <View style={{width: windowWidth / 2.5, height: 30, marginTop: 10}} />
          <View style={{width: windowWidth / 4, height: 30, marginTop: 10}} />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  alignCenter: {
    alignItems: 'center',
  },
});
export default Skeleton;
