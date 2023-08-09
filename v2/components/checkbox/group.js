import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';

import Checkbox from './index';
import createStyle from '../../utils/style';

const CheckboxGroup = (props) => {
  const hasHandler = !!props.onChange;

  function renderItem({ item }) {
    function handleChange(value) {
      props.onChange(value, !props.value.includes(value));
    }

    return (
      <Checkbox
        {...item}
        checked={props.value.includes(item.value)}
        onChange={hasHandler ? handleChange: undefined}
        readOnly={props.readOnly}
      />
    );
  }

  return (
    <FlatList
      data={props.data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}
      keyExtractor={(item) => String(item.value)}
    />
  );
};

CheckboxGroup.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  value: PropTypes.array,
};

CheckboxGroup.defaultProps = {
  readOnly: false,
  value: [],
};

const styles = createStyle((theme) => ({
  separator: {
    height: theme.spacing(2),
  },
}));

export default CheckboxGroup;
