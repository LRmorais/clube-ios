import React from 'react';
import {View, Image} from 'react-native';

import Box from '../../../components/box';
import LabeledCheckboxGroup from '../../../components/labeledCheckbox/group';
import createStyle from '../../../utils/style';
import {insert, remove} from '../../../utils/array';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const SortAndFilters = () => {
  const {theme} = useLayoutContext();
  const {
    filterOptions: value,
    setFilterOptions,
    viewMode,
    othersFilters,
    headerPropsByScreenType,
    screenType,
    partnersData,
    showSortModal: handleSortPress,
    goToTagsFiltersScreen: handleOthersPress,
  } = useContext();
  console.log('value', value);
  const propsByViewMode = {
    maps: {
      box: {
        background: headerPropsByScreenType.backgroundColor,
      },
      checkbox: {
        color: {
          croppedText: headerPropsByScreenType.backgroundColor,
          highlight: theme.contrastTextColor,
          unchecked: headerPropsByScreenType.backgroundColor,
        },
        bordered: true,
      },
    },
    list: {
      box: {
        background: '#f7f7f7',
      },
      checkbox: {
        color: {
          croppedText: theme.contrastTextColor,
          highlight: theme.primaryColor,
          unchecked: theme.inputBackground,
        },
        bordered: false,
      },
    },
  }[viewMode];

  const options = [
    {
      ...propsByViewMode.checkbox,
      text: 'Desconto agora',
      value: 'discountNow',
    },
    {
      ...propsByViewMode.checkbox,
      text: 'Outros filtros',
      value: 'others',
    },
  ];
  if (screenType !== 'nearby') {
    options.unshift({
      ...propsByViewMode.checkbox,
      text: 'Ordenar por',
      value: 'sort',
      showCaret: true,
    });
  }
  if (othersFilters.length > 0) {
    options.unshift({
      ...propsByViewMode.checkbox,
      text: String(othersFilters.length),
      value: 'others-count',
      textBold: true,
    });
  }

  function handleChange(value, checked) {
    ({
      [value]: handleValueChange,
      sort: handleSortPress,
      others: handleOthersPress,
      'others-count': handleOthersPress,
    }[value](value, checked));
  }

  function handleValueChange(value, checked) {
    setFilterOptions(oldValue =>
      checked ? insert(oldValue, value) : remove(oldValue, value),
    );
  }

  const noGutters = {
    list: partnersData.length > 0 && 'bottom',
    maps: 'top',
  }[viewMode];

  if (partnersData.length <= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Box shadow="both" {...propsByViewMode.box} noGutters={noGutters}>
        <LabeledCheckboxGroup
          data={options}
          value={[...value, 'others-count']}
          onChange={handleChange}
        />
      </Box>
      {viewMode === 'maps' && (
        <Image
          style={styles.shadow}
          source={require('../../../images/vectors/bottomShadow.png')}
          resizeMode="stretch"
        />
      )}
    </View>
  );
};

const styles = createStyle(theme => ({
  container: {
    position: 'relative',
    width: '100%',
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: theme.spacing(0.75),
    left: 0,
    right: 0,
    bottom: theme.spacing(-0.75),
    zIndex: 111,
  },
}));

export default SortAndFilters;
