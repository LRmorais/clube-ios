import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function Skeleton() {
  return (
    <View style={{marginBottom: 20}}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="column" marginTop={50}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={300}
              height={200}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item alignItems="center" marginTop={30}>
            <SkeletonPlaceholder.Item
              width={300}
              height={30}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={300}
              height={30}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={300}
              height={30}
              borderRadius={10}
              marginTop={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item
            alignItems="flex-start"
            marginLeft={50}
            marginTop={30}>
            <SkeletonPlaceholder.Item
              width={200}
              height={200}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={200}
              height={30}
              borderRadius={10}
              marginTop={20}
            />
            <SkeletonPlaceholder.Item
              width={170}
              height={30}
              borderRadius={10}
              marginTop={20}
            />
            <SkeletonPlaceholder.Item
              width={120}
              height={30}
              borderRadius={10}
              marginTop={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
}

export default Skeleton;
