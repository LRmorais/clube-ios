import React from 'react';
import {FlatList, View} from 'react-native';

import createStyle from '../../utils/style';

const HorizontalList = props => (
  <FlatList
    {...props}
    key={'_'}
    ref={props.listRef}
    contentContainerStyle={styles.contentContainer}
    horizontal={false}
    numColumns={3}
    showsHorizontalScrollIndicator={false}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = createStyle(theme => ({
  contentContainer: {
    // paddingHorizontal: theme.spacing(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing(1),
  },
  separator: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export default HorizontalList;
