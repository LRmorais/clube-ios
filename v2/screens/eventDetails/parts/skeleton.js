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
        <View style={{alignItems: 'center'}}>
          <View style={{width: windowWidth, height: 260}} />
        </View>

        <View style={{alignItems: 'center', marginTop: 10}}>
          <View style={{width: 250, height: 30}} />
        </View>

        <View
          style={{
            alignItems: 'center',
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{width: 100, height: 20, marginRight: 25, borderRadius: 50}}
          />
          <View
            style={{width: windowWidth / 4, height: 20, borderRadius: 50}}
          />
        </View>

        <View style={{alignItems: 'center', marginTop: 35}}>
          <View style={{width: 350, height: 30}} />

          <View style={{width: 330, height: 30, marginTop: 10}} />
        </View>
        <View style={{alignItems: 'flex-start', marginTop: 35, marginLeft: 30}}>
          <View style={{width: windowWidth / 5, height: 30}} />
          <View style={{width: windowWidth / 4, height: 30, marginTop: 10}} />
        </View>

        <View style={{alignItems: 'center', marginTop: 45}}>
          <View style={{width: 350, height: 30}} />
          <View style={{width: 280, height: 20, marginTop: 20}} />
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <View style={{width: 350, height: 48, borderRadius: 10}} />
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
