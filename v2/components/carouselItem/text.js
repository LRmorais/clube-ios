import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import PaddingContainer from '../paddingContainer';
import Box from '../box';
import ExtraVerticalPaddingContainer from '../paddingContainer/extraVertical';
import createStyle from '../../utils/style';

const TextCarouselItem = (props) => (
  <Box background={props.color.background}>
    <PaddingContainer>
      <ExtraVerticalPaddingContainer>
        <Text style={[
          styles.primary,
          { color: props.color.primary },
        ]}>
          {props.text.primary}
        </Text>
        <Text style={[
          styles.secondary,
          { color: props.color.secondary },
        ]}>
          {props.text.secondary}
        </Text>
      </ExtraVerticalPaddingContainer>
    </PaddingContainer>
  </Box>
);

TextCarouselItem.propTypes = {
  color: PropTypes.shape({
    background: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.node.isRequired,
  }).isRequired,
};

const styles = createStyle((theme) => ({
  primary: {
    marginBottom: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(18),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(22),
    textAlign: 'center',
  },
  secondary : {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
    textAlign: 'center',
  },
}));

export default TextCarouselItem;
