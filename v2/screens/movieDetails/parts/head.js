/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import ReadMore from '@fawazahmed/react-native-read-more';

import ImageWithLoading from '../../../components/imageWithLoading';
import {ASSET_PREFIX} from '../../../constants/env';

import {useContext} from '../context';
import {useLayoutContext} from '../../../hocs/layout';
import createStyle from '../../../utils/style';

import ClockIcon from '../../../images/icons/clock.svg';
import TrailerIcon from '../../../images/icons/film-alt.svg';

export function Head() {
  const {screenWidth} = useLayoutContext();
  const {movieById: movie} = useContext();
  return (
    <View style={{padding: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: screenWidth / 3}}>
          <ImageWithLoading
            containerStyle={[styles.image]}
            source={{uri: ASSET_PREFIX + movie?.cover}}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginLeft: 20,
            width: '80%',
          }}>
          <View style={{width: '100%'}}>
            <Text style={styles.title}>
              {movie?.title ? movie?.title : movie?.originalTitle}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
            }}>
            {movie ? (
              <>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: '#f2f2f2',
                    }}>
                    <ClockIcon width={30} height={30} fill="#30287b" />
                  </View>

                  <Text style={styles.labelIcons}>{`${movie?.duration}'`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: 25,
                  }}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`${movie?.trailerUrl}?utm_source=app-zet&utm_medium=app&utm_campaign=app-zet`)}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      backgroundColor: '#f2f2f2',
                    }}>
                    <TrailerIcon width={30} height={30} fill="#30287b" />
                  </TouchableOpacity>

                  <Text style={styles.labelIcons}>Trailer</Text>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <ReadMore
          style={[
            styles.synopsis,
            {fontSize: 16, color: '#30287b', lineHeight: 21},
          ]}
          seeMoreStyle={{color: '#ffc133'}}
          seeLessStyle={{color: '#ffc133'}}
          numberOfLines={4}
          seeMoreText="Ler mais"
          seeLessText="Ler menos">
          {movie?.synopsis}
        </ReadMore>
      </View>
    </View>
  );
}

const styles = createStyle(theme => ({
  image: {
    overflow: 'hidden',
    resizeMode: 'cover',
    width: '100%',
    aspectRatio: 17 / 25,
    borderRadius: 2,
  },
  title: {
    width: '70%',
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(25),
    color: theme.palette.primary.main,
  },
  labelIcons: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    color: theme.palette.primary.main,
    marginTop: 10,
  },
  synopsis: {
    fontFamily: theme.typography.fontFamily.regular,
  },
}));
