import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';

import createStyle from '../../../utils/style';
import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

const LastTimeUpdated = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    lastTimeUpdatedData,
  } = useContext();

  return (
    <Text style={[
      styles.text,
      { color: theme.textPrimaryColor },
    ]}>
      {lastTimeUpdatedData && moment(lastTimeUpdatedData).format('LLLL')}
    </Text>
  );
};

const styles = createStyle((theme) => ({
  text: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
  },
}));

export default LastTimeUpdated;
