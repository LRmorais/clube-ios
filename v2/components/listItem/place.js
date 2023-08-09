/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Badge from '../../images/icons/badge-percent.svg';

import ImageWithLoading from '../imageWithLoading';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const PlaceListItem = props => {
  const {screenWidth} = useLayoutContext();
  const ratingIsNumber = typeof props.rating === 'number';
  const rating = ratingIsNumber && props.rating.toFixed(1).replace('.', ',');

  const imageWidth = screenWidth * 0.14;
  const showRating =
    !props._skeleton && ratingIsNumber && !Number.isNaN(rating);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={props.onPress ? 0.75 : 1}
      onPress={props.onPress}>
      <ImageWithLoading
        style={styles.image}
        containerStyle={[
          styles.imageContainer,
          {
            // backgroundColor: props.color.image,
          },
        ]}
        source={{uri: props.image}}
      />
      <View style={styles.info}>
        <View style={[styles.row]}>
          <View style={[styles.texts, {justifyContent: 'space-between'}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 5,
              }}>
              {props.rating ? (
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Icons name={'star'} size={20} color={'#ffc133'} />
                  <Text
                    style={[
                      styles.subTitle,
                      {color: '#ffc133', marginLeft: 5},
                    ]}>
                    {/* {props.rating.toFixed(1)} */}
                  </Text>
                </View>
              ) : null}

              <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                {props.distance ? (
                  <Icons
                    name={'map-marker-alt'}
                    color={props.color.title}
                    size={20}
                  />
                ) : null}

                <Text
                  style={[
                    styles.subTitle,
                    {color: props.color.title, marginLeft: 5},
                  ]}>
                  {props.distance}
                </Text>
              </View>
            </View>

            <Text style={[styles.title, {color: props.color.title}]}>
              {props.partnerName}
            </Text>
            <Text style={[styles.description, {color: props.color.title}]}>
              {props.category}
            </Text>
          </View>
          <View style={{width: 10}} />

          {props.discount ? (
            <View style={[styles.icons, {alignItems: 'center'}]}>
              {/* <Icons name={'percent'} color={props.color.title} size={15} /> */}
              <Badge fill={props.color.title} height={25} width={25} />
              <Text
                style={[
                  styles.title,
                  {color: props.color.title, marginTop: 5},
                ]}>
                {props.category === 'Cinemas' ||
                'cinemas' ||
                props.tag === 'Cinemas' ||
                'cinemas'
                  ? `Até ${props.discount}%`
                  : `${props.discount}%`}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    resizeMode: 'contain',
    justifyContent: 'center',
    aspectRatio: 1 / 1,
    height: 125,
    width: 125,
    marginRight: theme.spacing(2.5),
  },
  image: {
    borderRadius: 10,
    // marginLeft: theme.spacing(1),
  },
  info: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  texts: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  subTitle: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  rating: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  icons: {
    // marginLeft: theme.spacing(3),
  },
  description: {
    marginTop: 5,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textTransform: 'capitalize',
  },
}));

export default PlaceListItem;
