import React from 'react';

import PlaceListItem from '../../../components/listItem/place';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import { ASSET_PREFIX } from '../../../constants/env';

const Partner = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
  } = useContext();

  return (
    <PlaceListItem
      image={ASSET_PREFIX + data.Partner.logo}
      title={data.Partner.fantasyName}
      descriptions={[data.Partner.Tag.name]}
      color={{
        image: theme.primaryColor,
        title: theme.primaryColor,
      }}
    />
  )
};

export default Partner;
