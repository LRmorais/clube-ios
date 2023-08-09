import React from 'react';
import {View, Text} from 'react-native';
import FilterBox from '../../../components/filterBox';
import FilterList from '../../../components/filterList';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const SortModal = () => {
  const {theme} = useLayoutContext();
  const {
    Search,
    orderBy,
    setOrderBy,
    selectedFilters,
    setSelectedFilters,
    categories,
    controlledDeviceLocation,
    sortOption,
    setSortOption,
    sortModalVisible: visible,
    hideSortModal: handleClose,
  } = useContext();

  const screenType = '';

  const radioColor = {
    default: theme.checkboxDefault,
    defaultSelected: theme.tertiaryColor,
    innerBall: theme.tertiaryColor,
    text: theme.checkboxDefault,
    textSelected: theme.checkboxDefault,
  };

  const data = [];
  if (screenType !== 'nearby') {
    data.unshift({
      color: radioColor,
      label: 'Ordem alfabética',
      value: 'alphabetical',
    });
  }
  if (controlledDeviceLocation) {
    data.unshift({
      color: radioColor,
      label: 'Distância',
      value: 'distance',
    });
  }

  function handleChange(value) {
    setSortOption(value);
    handleClose();
  }

  // if (data.length === 0) {
  //   return null;
  // }

  return (
    <FilterBox
      color={{
        divider: theme.greyishBackground,
        mask: theme.primaryColorShade,
        title: theme.primaryColor,
      }}
      title="Ordenar por"
      visible={visible}
      onClose={handleClose}
      handleFilters={setSelectedFilters}
      aply={Search}>
      {/* <RadioGroup data={data} value={value} onChange={handleChange} /> */}
      <FilterList
        color={theme.primaryColor}
        data={categories}
        handleFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        handleOrder={setSortOption}
        orderBy={sortOption}
        aply={Search}
        onClose={handleClose}
      />
    </FilterBox>
  );
};

export default SortModal;
