import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import ListLabeledIcons from '../icons/listLabeled';
import {formatPrice} from '../../utils/data';
import createStyle from '../../utils/style';

const EventConciseListItem = props => (
  <>
    <TouchableOpacity
      style={[styles.container, props.horizontal && styles.containerHorizontal]}
      activeOpacity={props.onPress ? 0.75 : 1}
      onPress={props.onPress}>
      <ImageWithLoading
        containerStyle={[styles.image, {backgroundColor: props.color.image}]}
        source={{uri: props.image}}
      />
      <View style={styles.dateBox}>
        <Text style={[styles.textDate, {color: props.color.text.primary}]}>
          {props.text.date}
        </Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.container, props.horizontal && styles.containerHorizontal]}
      activeOpacity={props.onPress ? 0.75 : 1}
      onPress={props.onPress}>
      <View
        style={[
          styles.innerContainer,
          props.horizontal && styles.innerContainerHorizontal,
        ]}>
        <Text style={[styles.textPrimary, {color: props.color.text.primary}]}>
          {props.text.primary}
        </Text>
        {props.text.secondary && (
          <Text
            style={[styles.textSecondary, {color: props.color.text.secondary}]}
            ellipsizeMode="tail">
            {props.text.secondary}
          </Text>
        )}
        <Text style={[styles.textPrimary, {color: props.color.text.primary}]}>
          A partir de:
        </Text>
        <Text style={[styles.textPricing, {color: props.color.text.primary}]}>
          {props.text.price === 0 ? 'Gratuito' : formatPrice(props.text.price)}
        </Text>
      </View>
    </TouchableOpacity>
  </>
);

EventConciseListItem.propTypes = {
  color: PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.shape({
      date: PropTypes.string,
      primary: PropTypes.string.isRequired,
      secondary: PropTypes.string,
    }).isRequired,
  }).isRequired,
  horizontal: PropTypes.bool,
  icons: PropTypes.array,
  id: PropTypes.number.isRequired,
  // image: ?
  onPress: PropTypes.func,
  text: PropTypes.shape({
    date: PropTypes.string,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }).isRequired,
};

EventConciseListItem.defaultProps = {
  horizontal: false,
};

const styles = createStyle(theme => ({
  container: {
    width: 150,
  },
  containerHorizontal: {
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    overflow: 'hidden',
    width: 150,
    aspectRatio: 3 / 2,
    borderRadius: 2,
  },
  innerContainer: {
    flex: 1,
    paddingTop: theme.spacing(0.5),
  },
  innerContainerHorizontal: {
    paddingLeft: theme.spacing(2),
  },
  date: {
    marginTop: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
  },
  textPrimary: {
    marginVertical: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  textSecondary: {
    marginVertical: theme.spacing(0.5),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    marginBottom: theme.spacing(1.5),
    textAlign: 'left',
  },
  iconsContainer: {
    marginTop: theme.spacing(0.5),
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
  textDate: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
    lineHeight: 25,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: '#ffc133',
  },
  textPricing: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
    lineHeight: 18.6,
    textAlign: 'justify',
  },
}));

export default EventConciseListItem;
