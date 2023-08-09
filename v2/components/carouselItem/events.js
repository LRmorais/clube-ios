import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import HorizontalDate from '../horizontalDate';
import PaddingContainer from '../paddingContainer';
import ImageWithLoading from '../imageWithLoading';
import createStyle, {theme} from '../../utils/style';
import {formatPrice} from '../../utils/data';
import {useLayoutContext} from '../../hocs/layout';

const EventsCarouselItem = props => {
  const {theme} = useLayoutContext();

  return (
    <PaddingContainer>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={props.onPress ? 0.75 : 1}
        onPress={props.onPress}>
        <ImageWithLoading
          containerStyle={[styles.image, {width: '100%'}]}
          source={{uri: props.image}}
        />
        <View style={styles.dateBox}>
          <HorizontalDate date={props.date} textColor={theme.primaryColor} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={props.onPress ? 0.75 : 1}
        onPress={props.onPress}>
        <View style={styles.texts}>
          <Text style={[styles.textPrimary, {color: props.primary.color}]}>
            {props.primary.text}
          </Text>
          <Text style={[styles.textSecondary, {color: props.primary.color}]}>
            {props.secondary.text}
          </Text>

          <View>
            <Text style={[styles.textPrimary, {color: props.primary.color}]}>
              A partir de:
            </Text>
            <Text style={[styles.textPricing, {color: props.primary.color}]}>
              {props.price.text === 0
                ? 'Gratuito'
                : formatPrice(props.price.text)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </PaddingContainer>
  );
};

EventsCarouselItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  primary: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  secondary: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

EventsCarouselItem.Skeleton = props => (
  <EventsCarouselItem
    id={props.id}
    image=""
    primary={{
      image: theme.secondColorShade,
      text: '██████████████████████████████',
      color: props.primary.color,
    }}
    secondary={{
      text: '████████████',
      color: props.secondary.color,
    }}
  />
);

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: theme.spacing(1.5),
  },
  textPrimary: {
    fontFamily: theme.typography.fontFamily.bold,

    fontSize: theme.typography.fontSize.__zeplinSpToPx(12.4),
    lineHeight: 23,
    marginTop: 12,
    marginBottom: 5,
  },
  textSecondary: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
    lineHeight: 18.6,
    textAlign: 'left',
  },
  textPricing: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
    lineHeight: 18.6,
    textAlign: 'justify',
  },
  image: {
    overflow: 'hidden',
    aspectRatio: 156 / 100,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  dateBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
}));

export default EventsCarouselItem;
