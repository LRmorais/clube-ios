import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import Icon from '../icons';
import createStyle from '../../utils/style';

const InfoBox = props => (
  <TouchableOpacity
    activeOpacity={props.onPress ? 0.75 : 1}
    onPress={props.onPress}>
    <PaddingContainer style={styles.container}>
      {props.icon && (
        <View style={styles.header}>
          <Icon
            id={props.icon}
            size={18}
            style={[
              styles.icon,
              {color: props.color.icon || props.color.title},
            ]}
          />
        </View>
      )}
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: props.color.title}]}>
            {props.title}
          </Text>
        </View>
        {props.children && <View>{props.children}</View>}
      </View>
    </PaddingContainer>
  </TouchableOpacity>
);

InfoBox.propTypes = {
  children: PropTypes.node,
  color: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  icon: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string.isRequired,
};

const styles = createStyle(theme => ({
  container: {
    flexDirection: 'row',
  },
  header: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    minHeight: theme.spacing(6),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  innerContainer: {
    flex: 1,
  },
  title: {
    alignSelf: 'flex-start',
    marginRight: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 21,
  },
}));

export default InfoBox;
