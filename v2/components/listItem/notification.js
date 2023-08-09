import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import createStyle from '../../utils/style';
import { useLayoutContext } from '../../hocs/layout';

const NotificationListItem = (props) => {
  const {
    screenWidth,
  } = useLayoutContext();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={props._skeleton ? 1 : .75}
      onPress={props.onPress}
    >
      <ImageWithLoading
        containerStyle={[
          styles.image,
          {
            width: screenWidth * .14,
            backgroundColor: props.color.image,
          },
        ]}
        source={{ uri: props.image }}
      />
      <View style={styles.texts}>
        <Text style={[
          styles.textPrimary,
          { color: props.color.primary },
        ]}>
          {props.text.primary}
        </Text>
        <Text style={[
          styles.textSecondary,
          { color: props.color.secondary },
        ]}>
          {props.text.secondary}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

NotificationListItem.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    image: PropTypes.string,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
};

NotificationListItem.defaultProps = {
  _skeleton: false,
};

NotificationListItem.Skeleton = (props) => (
  <NotificationListItem
    _skeleton
    id={props.id}
    color={props.color}
    image=""
    onPress={() => {}}
    text={{
      primary: '██████████████████████████████',
      secondary: '█████████',
    }}
  />
);

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
  },
  texts: {
    flex: 1,
    paddingLeft: theme.spacing(2),
  },
  textPrimary: {
    marginBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
  textSecondary: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
  },
  image: {
    overflow: 'hidden',
    aspectRatio: 1 / 1,
    resizeMode: 'cover',
    borderRadius: 2,
  },
}));

export default NotificationListItem;
