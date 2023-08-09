import React from 'react';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import CheckboxGroup from '../../../components/checkbox/group';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Filters = () => {
  const {theme} = useLayoutContext();
  const {
    filtersChecked: value,
    nonRepeatedFilters,
    handleFiltersChange: handleChange,
  } = useContext();

  const data = nonRepeatedFilters.map(filter => ({
    color: {
      checked: theme.tertiaryColor,
      default: theme.checkboxDefault,
    },
    value: filter.slug,
    label: filter.name,
  }));

  return (
    <Box shadow="bottom">
      <PaddingContainer>
        <CheckboxGroup data={data} value={value} onChange={handleChange} />
      </PaddingContainer>
    </Box>
  );
};

export default Filters;
