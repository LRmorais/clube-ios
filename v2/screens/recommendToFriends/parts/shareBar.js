import React from 'react';

import FlatShate from '../../../components/share/flat';
import { useAnalyticsContext } from '../../../hocs/analytics';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const ShareBar = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    dispatchRecord,
  } = useAnalyticsContext();
  const {
    userShareLink,
  } = useContext();

  function handleCopy() {
    dispatchRecord('Link copiado - indicação de amigos');
  }

  function handleShare() {
    dispatchRecord('Tentativa de compartilhamento - indicação de amigos');
  }

  return (
    <FlatShate
      color={{
        background: theme.primaryColorShade,
        link: theme.contrastTextColor,
        options: theme.secondColorShade,
      }}
      text={{
        link: 'Copiar link',
        options: 'Mais opções de compartilhamento',
      }}
      link={userShareLink}
      message={`Quer ter várias experiências incríveis em Curitiba? Viva mais e pague menos com o Clube Gazeta: ${userShareLink}`}
      onCopy={handleCopy}
      onShare={handleShare}
    />
  );
};

export default ShareBar;
