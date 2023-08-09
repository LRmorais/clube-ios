import React from 'react';

import FilterBox from '../../../components/filterBox';
import RadioGroup from '../../../components/radio/group';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const SortModal = () => {
  const {theme} = useLayoutContext();
  const {
    controlledDeviceLocation,
    sortOption: value,
    setSortOption,
    screenType,
    sortModalVisible: visible,
    hideSortModal: handleClose,
  } = useContext();

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

  if (data.length === 0) {
    return null;
  }

  return (
    <FilterBox
      color={{
        divider: theme.greyishBackground,
        mask: theme.primaryColorShade,
        title: theme.primaryColor,
      }}
      title="Ordenar por"
      visible={visible}
      onClose={handleClose}>
      <RadioGroup data={data} value={value} onChange={handleChange} />
    </FilterBox>
  );
};

export default SortModal;
