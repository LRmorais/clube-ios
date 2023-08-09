import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const MuralListItem = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={props._skeleton ? 1 : 0.75}
      onPress={props.onPress}>
      <ImageWithLoading
        containerStyle={[
          styles.image,
          {
            width: '100%',
            height: 125,
            backgroundColor: props.color.image,
          },
        ]}
        source={{uri: props.image}}
        // resizeMode="contain"
      />
      {/* <Text>{props.text}</Text> */}
      {/* <View style={styles.texts}>
        <Text style={[styles.textPrimary, {color: props.color.primary}]}>
          {props.text.primary}
        </Text>
        <Text style={[styles.textSecondary, {color: props.color.secondary}]}>
          {props.text.secondary}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

MuralListItem.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    image: PropTypes.string,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }),
};

MuralListItem.defaultProps = {
  _skeleton: false,
};

MuralListItem.Skeleton = props => (
  <MuralListItem
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

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 25,
    marginLeft: 5,
  },
  image: {
    overflow: 'hidden',
    aspectRatio: 5 / 2,
    borderRadius: 10,
  },
  texts: {
    flex: 1,
    paddingLeft: theme.spacing(2),
  },
  textPrimary: {
    marginBottom: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
  },
  textSecondary: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(10),
  },
}));

export default MuralListItem;
