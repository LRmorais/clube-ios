import React from 'react';

import ImageEmpty from '../../../components/imageEmpty';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const NoResults = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    fullData,
    data,
  } = useContext();

  if (!data || data.length > 0) return null;

  const props = (
    fullData?.length === 0
      ? {
        imagePropsSource: require('../../../images/stuff/vouchersTeaser.png'),
        introInfo: undefined,
        mainInfoText: 'Grandes atrações estão\nchegando para você.\nAguarde as novidades!',
      }
      : {
        imagePropsSource: require('../../../images/personas/noResults.png'),
        introInfo: {
          text: 'Oops...',
          color: theme.contrastTextColor,
        },
        mainInfoText: 'Não encontramos nenhum resultado.',
      }
  );

  return (
    <ImageEmpty
      fillMode="onlyLacking"
      substractHeaderBar
      shadow="none"
      imageProps={{
        source: props.imagePropsSource,
        align: 'bottom',
      }}
      backgroundColor={theme.secondColorShade}
      introInfo={props.introInfo}
      mainInfo={{
        text: props.mainInfoText,
        color: theme.contrastTextColor,
      }}
    />
  );
};

export default NoResults;
