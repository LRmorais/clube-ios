import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import Icon from '../icons';
import createStyle from '../../utils/style';

const Description = (props) => (
  <View style={styles.container}>
    {props.icon && (
      <Icon
        id={props.icon}
        size={21}
        style={[
          styles.icon,
          { color: props.color.icon || props.color.primary },
        ]}
      />
    )}
    <View style={styles.text}>
      <Text style={[
        styles.textPrimary,
        { color: props.color.primary },
      ]}>
        {props.text.primary}
      </Text>
      {props.text.secondary && (
        <Text style={[
          styles.textSecondary,
          { color: props.color.secondary || props.color.primary },
        ]}>
          {props.text.secondary}
        </Text>
      )}
    </View>
  </View>
);

Description.propTypes = {
  color: PropTypes.shape({
    icon: PropTypes.string,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }).isRequired,
  icon: PropTypes.string,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  text: {
    flex: 1,
  },
  textPrimary: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.lineHeight.mostCommon,
  },
  textSecondary: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.lineHeight.mostCommon,
  },
}));

export default Description;
