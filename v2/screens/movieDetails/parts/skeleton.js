import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SecondExample = () => {
  return (
    <View style={{marginBottom: 20}}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" margin={20}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={140}
              height={200}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              marginTop={10}
              width={200}
              height={40}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item flexDirection="row">
              <SkeletonPlaceholder.Item
                marginTop={60}
                width={50}
                height={50}
                borderRadius={20}
              />
              <SkeletonPlaceholder.Item
                marginTop={60}
                marginLeft={10}
                width={50}
                height={50}
                borderRadius={20}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={350}
              height={35}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={350}
              height={35}
              borderRadius={10}
              marginTop={10}
            />
            <SkeletonPlaceholder.Item
              width={350}
              height={35}
              borderRadius={10}
              marginTop={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" margin={20}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={130}
              height={80}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={130}
              height={80}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={130}
              height={80}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" margin={20}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={130}
              height={130}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={100}
              height={20}
              marginTop={20}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={200}
              height={20}
              marginTop={20}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              width={130}
              height={20}
              marginTop={20}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>

      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" margin={20}>
          <SkeletonPlaceholder.Item alignItems="center">
            <SkeletonPlaceholder.Item
              width={115}
              height={55}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>

          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={115}
              height={55}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item alignItems="center" marginLeft={20}>
            <SkeletonPlaceholder.Item
              width={115}
              height={55}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};

export default SecondExample;
