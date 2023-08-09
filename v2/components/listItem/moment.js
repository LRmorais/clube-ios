import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

import ImageWithLoading from '../imageWithLoading';
import Icon from '../icons';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

const MomentListItem = props => {
  const {screenWidth} = useLayoutContext();

  return (
    <TouchableOpacity
      style={{width: screenWidth / 3, paddingBottom: 5}}
      activeOpacity={props._skeleton ? 1 : 0.75}
      onPress={props.onPress}>
      <ImageWithLoading
        containerStyle={[styles.image, {backgroundColor: props.color.image}]}
        source={props.image && {uri: props.image}}>
        {props.icon && (
          <Icon id={props.icon} size={20} style={{color: props.color.icon}} />
        )}
      </ImageWithLoading>
      <Text style={[styles.text, {color: props.color.title}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

MomentListItem.propTypes = {
  _skeleton: PropTypes.bool,
  color: PropTypes.shape({
    icon: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  icon: PropTypes.string,
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

MomentListItem.defaultProps = {
  _skeleton: false,
};

MomentListItem.Skeleton = props => (
  <MomentListItem
    _skeleton
    color={props.color}
    id={props.id}
    image=""
    title="█████████"
    onPress={() => {}}
  />
);

const styles = createStyle(theme => ({
  image: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    aspectRatio: 3 / 2,
    // borderRadius: 2,
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
  },
  text: {
    // marginTop: theme.spacing(1.0),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    textAlign: 'center',
  },
}));

export default MomentListItem;
