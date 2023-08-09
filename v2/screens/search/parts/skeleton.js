/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {useLayoutContext} from '../../../hocs/layout';

const Skeleton = () => {
  const {theme} = useLayoutContext();
  // const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={[styles.container, {backgroundColor: theme.greyishBackground}]}>
      <SkeletonPlaceholder highlightColor={theme.secondColorShade} speed={1500}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 20,
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                />
              </View>

              <View
                style={{
                  width: 140,
                  height: 20,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  width: 80,
                  height: 20,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

          <View style={{width: 50, height: 20, borderRadius: 10}} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 20,
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                />
              </View>

              <View
                style={{
                  width: 140,
                  height: 20,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  width: 80,
                  height: 20,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

          <View style={{width: 50, height: 20, borderRadius: 10}} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 20,
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                />
              </View>

              <View
                style={{
                  width: 140,
                  height: 20,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  width: 80,
                  height: 20,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

          <View style={{width: 50, height: 20, borderRadius: 10}} />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            padding: 20,
            width: '100%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                marginRight: 15,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    width: 50,
                    height: 20,
                    borderRadius: 10,
                    marginBottom: 15,
                  }}
                />
              </View>

              <View
                style={{
                  width: 140,
                  height: 20,
                  borderRadius: 10,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  width: 80,
                  height: 20,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>

          <View style={{width: 50, height: 20, borderRadius: 10}} />
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
