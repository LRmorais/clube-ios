import React from 'react';
import { View, Text, Switch } from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import createStyle from '../../utils/style';

const MeaningfulSwitch = (props) => (
  <Box>
    <PaddingContainer style={styles.container}>
      <View style={styles.texts}>
        <Text style={[
          styles.title,
          { color: props.color.title }
        ]}>
          {props.title}
        </Text>
        <Text style={[
          styles.description,
          { color: props.color.description },
        ]}>
          {props.description}
        </Text>
      </View>
      <Switch
        thumbColor={props.color.thumb}
        trackColor={{ true: props.color.track + '80' }}
        disabled={props.disabled}
        value={props.value}
        onValueChange={props.onChange}
      />
    </PaddingContainer>
  </Box>
);

MeaningfulSwitch.propTypes = {
  color: PropTypes.shape({
    description: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    track: PropTypes.string.isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.bool,
};

MeaningfulSwitch.defaultProps = {
  disabled: false,
  value: false,
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  texts: {
    flex: 1,
    paddingRight: theme.spacing(3),
  },
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
  },
  description: {
    marginTop: theme.spacing(2),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
  },
}));

export default MeaningfulSwitch;
