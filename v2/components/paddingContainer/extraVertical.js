import React from 'react';
import { View } from 'react-native';

import createStyle from '../../utils/style';

const ExtraVerticalPaddingBox = (props) => (
  <View
    {...props}
    style={[
      styles.container,
      props?.style,
    ]}
  />
);

const styles = createStyle((theme) => ({
  container: {
    paddingVertical: theme.spacing(1),
  },
}));

export default ExtraVerticalPaddingBox;
