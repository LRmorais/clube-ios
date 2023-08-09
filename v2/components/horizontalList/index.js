import React from 'react';
import {FlatList, View} from 'react-native';

import createStyle from '../../utils/style';

const HorizontalList = props => (
  <FlatList
    {...props}
    ref={props.listRef}
    contentContainerStyle={styles.contentContainer}
    horizontal
    showsHorizontalScrollIndicator={false}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = createStyle(theme => ({
  contentContainer: {
    paddingHorizontal: theme.spacing(3),
  },
  separator: {
    width: theme.spacing(1),
  },
}));

export default HorizontalList;
