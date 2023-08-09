import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SecondExample = ({}) =>
  Array.from({length: 6}).map((_, index) => (
    <View key={index} style={{marginBottom: 20}}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" margin={20}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={130}
              height={200}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              marginTop={20}
              width={100}
              height={20}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={130}
              height={200}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              marginTop={20}
              width={100}
              height={20}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={130}
              height={200}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              marginTop={20}
              width={100}
              height={20}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  ));

export default SecondExample;
