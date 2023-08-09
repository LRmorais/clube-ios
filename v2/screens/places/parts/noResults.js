import React from 'react';

import Box from '../../../components/box';
import ImageEmpty from '../../../components/imageEmpty';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const NoResults = () => {
  const {theme} = useLayoutContext();
  const {
    partnersData,
    viewMode,
    screenType,
    goToIndicateEstablishmentScreen: handleIndicatePress,
    clearFilters: handleClearPress,
  } = useContext();

  const whatToShow = partnersData.length > 0 ? 'indicate' : 'clear';

  const shadow = partnersData.length === 0 ? 'none' : 'top';
  const imageProps = {
    indicate: {
      source: require('../../../images/personas/movie.png'),
    },
    clear: {
      source: require('../../../images/personas/noResults.png'),
    },
  }[whatToShow];
  const backgroundColor = {
    indicate: theme.secondColorShade,
    clear: theme.secondColorShade,
  }[whatToShow];
  const introInfoProps = {
    indicate: {
      text: 'Não encontrou o que procurava?',
      color: theme.contrastTextColor,
    },
  }[whatToShow];
  const mainInfoProps = {
    indicate: {
      text: 'Indique um estabelecimento para entrar no Clube!',
      color: theme.contrastTextColor,
    },
    clear: {
      text: 'Não encontramos nenhum resultado para sua busca.',
      color: theme.contrastTextColor,
    },
  }[whatToShow];
  const actionProps = {
    indicate: {
      text: 'Indicar estabelecimento',
      onPress: handleIndicatePress,
      backgroundColor: theme.primaryColorShade,
      textColor: theme.contrastTextColor,
    },
    clear: {
      text: 'Limpar filtros',
      onPress: handleClearPress,
      backgroundColor: theme.primaryColorShade,
      textColor: theme.contrastTextColor,
    },
  }[whatToShow];

  if (!whatToShow) {
    return null;
  }
  if (viewMode === 'maps') {
    return null;
  }
  if (screenType === 'moment' || screenType === 'guide') {
    return null;
  }

  return (
    <Box shadow={shadow} noGutters>
      <ImageEmpty
        fillMode="wholeScreen"
        substractHeaderBar
        imageProps={{
          ...imageProps,
          align: 'bottom',
        }}
        backgroundColor={backgroundColor}
        introInfo={introInfoProps}
        mainInfo={mainInfoProps}
        action={actionProps}
      />
    </Box>
  );
};

export default NoResults;
