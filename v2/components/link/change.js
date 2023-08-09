import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const ChangeLink = (props) => (
  <TouchableOpacity
    activeOpacity={.75}
    onPress={props.onPress}
  >
    <View style={styles.innerContainer}>
      <Text style={[
        styles.textMain,
        { color: props.color.main },
      ]}>
        {props.text.main}
      </Text>
      <Icon
        id="arrow-right"
        size={11}
        style={{ color: props.color.icon || props.color.main }}
      />
    </View>
    {props.text.action && (
      <Text style={[
        styles.textAction,
        { color: props.color.action || props.color.main }
      ]}>
        {props.text.action.toUpperCase()}
      </Text>
    )}
  </TouchableOpacity>
);

ChangeLink.propTypes = {
  color: PropTypes.shape({
    action: PropTypes.string,
    icon: PropTypes.string,
    main: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.shape({
    action: PropTypes.string,
    main: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textMain: {
    flex: 1,
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  textAction: {
    marginTop: theme.spacing(.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
  },
}))

export default ChangeLink;
