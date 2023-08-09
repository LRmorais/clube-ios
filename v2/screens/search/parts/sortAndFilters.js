import React from 'react';
import {View} from 'react-native';

import LabeledCheckboxGroup from '../../../components/labeledCheckbox/group';
import createStyle from '../../../utils/style';
import {insert, remove} from '../../../utils/array';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const SortAndFilters = () => {
  const {theme} = useLayoutContext();
  const {
    selectedFilters: value,
    setFilterOptions,
    othersFilters,
    partnersData,
    showSortModal: handleSortPress,
    goToTagsFiltersScreen: handleOthersPress,
  } = useContext();

  const viewMode = 'list';

  const propsByViewMode = {
    list: {
      box: {
        background: '#f7f7f7',
      },
      checkbox: {
        color: {
          croppedText: theme.contrastTextColor,
          highlight: theme.primaryColor,
          unchecked: theme.contrastTextColor,
        },
        bordered: false,
      },
    },
  }[viewMode];

  const options = [
    // {
    //   ...propsByViewMode.checkbox,
    //   text: 'Desconto agora',
    //   value: 'discountNow',
    // },
    // {
    //   ...propsByViewMode.checkbox,
    //   text: 'Outros filtros',
    //   value: 'others',
    // },
    {
      ...propsByViewMode.checkbox,
      text: 'Ordenar por',
      value: 'sort',
      showCaret: true,
    },
  ];

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

  // if (partnersData.length <= 1) {
  //   return null;
  // }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingTop: 16,
          paddingBottom: 16,
          backgroundColor: '#f7f7f7',
        }}>
        <LabeledCheckboxGroup
          data={options}
          value={[...value, 'others-count']}
          onChange={handleChange}
        />
      </View>
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
