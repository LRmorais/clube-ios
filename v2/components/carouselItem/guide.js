import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import ImageWithLoading from '../imageWithLoading';
import createStyle, {theme} from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const GuideCarouselItem = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <PaddingContainer>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={props.onPress ? 0.75 : 1}
        onPress={props.onPress}>
        <View style={styles.texts}>
          <Text style={[styles.textPrimary, {color: props.primary.color}]}>
            {props.primary.text}
          </Text>
          <Text style={[styles.textSecondary, {color: props.secondary.color}]}>
            {props.secondary.text}
          </Text>
        </View>
        <ImageWithLoading
          containerStyle={[
            styles.image,
            {width: (screenWidth - theme.spacing(3 * 2)) / 2},
          ]}
          source={{uri: props.image}}
        />
      </TouchableOpacity>
    </PaddingContainer>
  );
};

GuideCarouselItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  primary: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string,
  }),
  secondary: PropTypes.shape({
    color: PropTypes.string.isRequired,
    text: PropTypes.string,
  }),
};

GuideCarouselItem.Skeleton = props => (
  <GuideCarouselItem
    id={props.id}
    image=""
    primary={{
      text: '██████',
      color: props.primary.color,
    }}
    secondary={{
      text: '███',
      color: props.secondary.color,
    }}
  />
);

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  texts: {
    flex: 1,
    justifyContent: 'center',
  },
  textPrimary: {
    fontFamily: theme.typography.fontFamily.different,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
    lineHeight: 28,
  },
  textSecondary: {
    fontFamily: theme.typography.fontFamily.different,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(34),
    lineHeight: 36,
  },
  image: {
    overflow: 'hidden',
    aspectRatio: 156 / 175,
    resizeMode: 'cover',
    borderRadius: 2,
  },
}));

export default GuideCarouselItem;
