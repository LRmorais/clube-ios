import React from 'react';
import { View, Image } from 'react-native';

import Box from '../../../components/box';
import LabeledCheckboxGroup from '../../../components/labeledCheckbox/group';
import createStyle from '../../../utils/style';
import { insert, remove } from '../../../utils/array';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const SortAndFilters = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    filterOptions: value,
    setFilterOptions,
    othersFilters,
    goToTagsFiltersScreen: handleOthersPress,
  } = useContext();

  const checkboxProps = {
    color: {
      croppedText: theme.primaryColor,
      highlight: theme.contrastTextColor,
      unchecked: theme.primaryColor,
    },
    bordered: true,
  };

  const options = [
    {
      ...checkboxProps,
      text: 'Desconto agora',
      value: 'discountNow',
    },
    {
      ...checkboxProps,
      text: 'Outros filtros',
      value: 'others',
    },
  ];
  if (othersFilters.length > 0) options.unshift({
    ...checkboxProps,
    text: String(othersFilters.length),
    value: 'others-count',
    textBold: true,
  });

  function handleChange(value, checked) {
    ({
      [value]: handleValueChange,
      others: handleOthersPress,
      'others-count': handleOthersPress,
    })[value](value, checked);
  }

  function handleValueChange(value, checked) {
    setFilterOptions((oldValue) => (
      checked
        ? insert(oldValue, value)
        : remove(oldValue, value)
    ));
  }

  return (
    <View style={styles.container}>
      <Box
        background={theme.primaryColor}
        noGutters="top"
      >
        <LabeledCheckboxGroup
          data={options}
          value={[...value, 'others-count']}
          onChange={handleChange}
        />
      </Box>
      <Image
        style={styles.shadow}
        source={require('../../../images/vectors/bottomShadow.png')}
        resizeMode="stretch"
      />
    </View>
  );
};

const styles = createStyle((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: theme.spacing(.75),
    left: 0,
    right: 0,
    bottom: theme.spacing(-.75),
    zIndex: 111,
  },
}));

export default SortAndFilters;
