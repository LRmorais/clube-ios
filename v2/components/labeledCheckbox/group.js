import React from 'react';
import {FlatList, View} from 'react-native';
import PropTypes from 'prop-types';

import LabeledCheckbox from './index';
import createStyle from '../../utils/style';

const LabeledCheckboxGroup = props => {
  const hasHandler = !!props.onChange;

  function handleChange(value) {
    props.onChange(value, !props.value.includes(value));
  }

  function renderItem({item}) {
    return (
      <LabeledCheckbox
        {...item}
        checked={props.value.includes(item.value)}
        onChange={hasHandler ? handleChange : undefined}
      />
    );
  }

  return (
    <FlatList
      contentContainerStyle={!props.noGutters && styles.contentContainer}
      data={props.data}
      renderItem={renderItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => String(item.value)}
    />
  );
};

LabeledCheckboxGroup.propTypes = {
  data: PropTypes.array.isRequired,
  noGutters: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ),
};

LabeledCheckboxGroup.defaultProps = {
  noGutters: false,
  value: [],
};

const styles = createStyle(theme => ({
  contentContainer: {
    paddingHorizontal: theme.spacing(3),
  },
  separator: {
    width: theme.spacing(1.5),
  },
}));

export default LabeledCheckboxGroup;
