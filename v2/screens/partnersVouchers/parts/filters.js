import React from 'react';
import { View, Image } from 'react-native';

import LabeledCheckboxGroup from '../../../components/labeledCheckbox/group';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const SortAndFilters = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    fullData,
    filters,
    filterData: handleChange,
  } = useContext();

  if (fullData?.length === 0) return null;

  const optionColors = {
    croppedText: theme.primaryColor,
    highlight: theme.whiteBackground,
    unchecked: theme.primaryColor,
  };

  const options = [
    {
      color: optionColors,
      text: 'Disponíveis',
      value: 'available',
    },
    {
      color: optionColors,
      text: 'Pendentes',
      value: 'toBeUsed',
    },
    {
      color: optionColors,
      text: 'Utilizados',
      value: 'used',
    },
    {
      color: optionColors,
      text: 'Futuros',
      value: 'future',
    },
  ];

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.primaryColor },
    ]}>
      <LabeledCheckboxGroup
        data={options}
        value={filters}
        onChange={handleChange}
      />
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
    paddingVertical: theme.spacing(2),
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: theme.spacing(.75),
    left: 0,
    right: 0,
    bottom: theme.spacing(-.75),
    zIndex: 1,
  },
}));

export default SortAndFilters;
