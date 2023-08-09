import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import GuideCarouselItem from '../carouselItem/guide';
import createStyle from '../../utils/style';

const GuideHead = (props) => (
  <Box background={props.backgroundColor}>
    <GuideCarouselItem
      id={props.id}
      image={props.image}
      primary={props.primary}
      secondary={props.secondary}
    />
    <PaddingContainer>
      <Text style={[
        styles.info,
        styles.infoPrimary,
        { color: props.info.color },
      ]}>
        {props.info.primary}
      </Text>
      <Text style={[
        styles.info,
        styles.infoSecondary,
        { color: props.info.color },
      ]}>
        {props.info.secondary}
      </Text>
    </PaddingContainer>
  </Box>
);

GuideHead.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  info: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
  }).isRequired,
  primary: PropTypes.object.isRequired,
  secondary: PropTypes.object.isRequired,
};

const styles = createStyle((theme) => ({
  info: {
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textAlign: 'center',
    lineHeight: 23.5,
  },
  infoPrimary: {
    marginTop: theme.spacing(4),
    fontFamily: theme.typography.fontFamily.regular,
    textAlign: 'justify',
  },
  infoSecondary: {
    marginTop: theme.spacing(3),
    fontFamily: theme.typography.fontFamily.bold,
  },
}));

export default GuideHead;
