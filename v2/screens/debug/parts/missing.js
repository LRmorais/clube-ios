import React from 'react';
import { FlatList, Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const LastTimeUpdated = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    missingData: data,
  } = useContext();

  function renderItem({ item }) {
    return (
      <Text style={[
        styles.text,
        styles.item,
        { color: theme.textPrimaryColor },
      ]}>
        {item}
      </Text>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      numColumns={5}
      ListEmptyComponent={(
        <Text style={[
          styles.text,
          { color: theme.textPrimaryColor },
        ]}>
          Tudo certo.
        </Text>
      )}
    />
  );
};

const styles = createStyle((theme) => ({
  text: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(20),
  },
  item: {
    width: '20%',
  },
}));

export default LastTimeUpdated;
