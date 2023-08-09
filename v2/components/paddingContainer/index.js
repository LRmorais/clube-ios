import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const PaddingContainer = (props) => (
  <View
    {...props}
    style={[
      {
        left: styles.containerOnlyLeft,
        right: styles.containerOnlyRight,
        [undefined]: styles.containerBothSides,
      }[props.only],
      props.alignContentRight && styles.alignRight,
      props?.style,
    ]}
  />
);

PaddingContainer.propTypes = {
  alignContentRight: PropTypes.bool,
  only: PropTypes.oneOf(['left', 'right']),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

PaddingContainer.defaultProps = {
  alignContentRight: false,
};

const paddingFactor = 3;
const styles = createStyle((theme) => ({
  containerOnlyLeft: {
    paddingLeft: theme.spacing(paddingFactor),
  },
  containerOnlyRight: {
    paddingRight: theme.spacing(paddingFactor),
  },
  containerBothSides: {
    paddingHorizontal: theme.spacing(paddingFactor),
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

export default PaddingContainer;
