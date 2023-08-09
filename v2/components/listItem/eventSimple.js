import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import ListLabeledIcons from '../icons/listLabeled';
import createStyle from '../../utils/style';

const EventSimpleListItem = (props) => (
  <TouchableOpacity
    style={styles.container}
    activeOpacity={props.onPress ? .75 : 1}
    onPress={props.onPress}
  >
    <View style={styles.innerContainer}>
      <Text
        style={[
          styles.textPrimary,
          { color: props.color.text.primary },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {props.text.primary}
      </Text>
      <View style={styles.secondLine}>
        {props.text.date && (
          <Text style={[
            styles.date,
            { color: props.color.text.date || props.color.text.secondary },
          ]}>
            {props.text.date.toUpperCase()}
          </Text>
        )}
        {props.icons && (
          <ListLabeledIcons
            data={props.icons}
            size="small"
            horizontal
          />
        )}
      </View>
    </View>
    <ImageWithLoading
      containerStyle={[
        styles.image,
        { backgroundColor: props.color.image },
      ]}
      source={{ uri: props.image }}
    />
  </TouchableOpacity>
);

EventSimpleListItem.propTypes = {
  color: PropTypes.shape({
    image: PropTypes.string.isRequired,
    text: PropTypes.shape({
      date: PropTypes.string,
      primary: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  icons: PropTypes.array,
  id: PropTypes.number.isRequired,
  // image: ?
  onPress: PropTypes.func,
  text: PropTypes.shape({
    date: PropTypes.string,
    primary: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  innerContainer: {
    flex: 1,
    paddingTop: theme.spacing(.5),
    paddingRight: theme.spacing(2),
  },
  textPrimary: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  secondLine: {
    flexDirection: 'row',
    marginTop: theme.spacing(.5),
  },
  date: {
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  image: {
    overflow: 'hidden',
    width: 50,
    aspectRatio: 1 / 1,
    borderRadius: 2,
  },
}));

export default EventSimpleListItem;
