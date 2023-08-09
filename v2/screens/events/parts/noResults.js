import React from 'react';

import ImageEmpty from '../../../components/imageEmpty';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const NoResults = () => {
  const {theme} = useLayoutContext();
  const {filteredData, clearFilters: handleClearPress, events} = useContext();
  if (filteredData?.length > 0 || !events) {
    return null;
  }

  return (
    <ImageEmpty
      fillMode="wholeScreen"
      substractHeaderBar
      imageProps={{
        source: require('../../../images/personas/noResults.png'),
        align: 'bottom',
      }}
      backgroundColor={theme.secondColorShade}
      mainInfo={{
        text: 'Não encontramos nenhum resultado para sua busca.',
        color: theme.primaryColorShade,
      }}
      action={
        events.length !== 0 || !events
          ? {
              text: 'Limpar filtros',
              backgroundColor: theme.primaryColorShade,
              textColor: theme.contrastTextColor,
              onPress: handleClearPress,
            }
          : undefined
      }
    />
  );
};

export default NoResults;
