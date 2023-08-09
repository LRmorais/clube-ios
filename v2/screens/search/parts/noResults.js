import React from 'react';

import ImageEmpty from '../../../components/imageEmpty';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const NoResults = () => {
  const {theme} = useLayoutContext();
  const {clearSearchValue: handleActionPress} = useContext();

  return (
    <ImageEmpty
      fillMode="onlyLacking"
      backgroundColor={theme.primaryColorShade}
      imageProps={{
        align: 'top',
        source: require('../../../images/personas/noResults.png'),
      }}
      mainInfo={{
        text: 'Não encontramos nenhum resultado para sua busca.',
        color: theme.contrastTextColor,
      }}
      // action={{
      //   backgroundColor: theme.secondColorShade,
      //   text: 'Fazer outra pesquisa',
      //   textColor: theme.primaryColor,
      //   // onPress: handleActionPress,
      // }}
    />
  );
};

export default NoResults;
