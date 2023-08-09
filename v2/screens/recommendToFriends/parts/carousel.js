import React from 'react';

import FullScreenCarousel from '../../../components/carousel/fullScreen';
import TextCarouselItem from '../../../components/carouselItem/text';
import Icon from '../../../components/icons';

import { useLayoutContext } from '../../../hocs/layout';

const PermissionsCarousel = () => {
  const {
    theme,
  } = useLayoutContext();

  const data = [
    {
      backgroundProps: {
        source: require('../../../images/personas/recommendToFriends1.png'),
        resizeMode: 'contain',
        containerStyle: {
          width: '100%',
          aspectRatio: 1 / 1,
        },
      },
      color: {
        background: theme.primaryColor,
        primary: theme.contrastTextColor,
        secondary: theme.contrastTextColor,
      },
      text: {
        primary: 'Indique seus amigos e ganhe recompensas!',
        secondary: 'Suas indicações retornam em cashback. Confira como ->',
      },
    },
    {
      backgroundProps: {
        source: require('../../../images/personas/recommendToFriends2.png'),
        resizeMode: 'contain',
        containerStyle: {
          width: '100%',
          aspectRatio: 108 / 79,
        },
      },
      color: {
        background: theme.primaryColor,
        primary: theme.contrastTextColor,
        secondary: theme.contrastTextColor,
      },
      text: {
        primary: '1. Compartilhe seu link de assinante',
        secondary: 'Pressione "copiar link" e envie para seus amigos entrarem no Clube.',
      },
    },
    {
      backgroundProps: {
        source: require('../../../images/personas/recommendToFriends3.png'),
        resizeMode: 'contain',
        containerStyle: {
          width: '100%',
          aspectRatio: 108 / 79,
        },
      },
      color: {
        background: theme.primaryColor,
        primary: theme.contrastTextColor,
        secondary: theme.contrastTextColor,
      },
      text: {
        primary: '2. Acumule pontos',
        secondary: (
          <>
            Quando alguém assinar o Clube com o seu link, você recebe R$ 10 de saldo. Confira seu saldo total pressionando o ícone
            {' '}
            <Icon
              id="user"
              size={13}
              style={{ color: theme.contrastTextColor }}
            />
            {' '}
            no canto superior direito.
          </>
        ),
      },
    },
    {
      backgroundProps: {
        source: require('../../../images/personas/recommendToFriends4.png'),
        resizeMode: 'contain',
        containerStyle: {
          width: '100%',
          aspectRatio: 1 / 1,
        },
      },
      color: {
        background: theme.primaryColor,
        primary: theme.contrastTextColor,
        secondary: theme.contrastTextColor,
      },
      text: {
        primary: '3. Resgate seu bônus',
        secondary: 'Depois de acumular pelo menos R$ 50, você pode efetuar seu resgate! Vamos começar?',
      },
    },
  ];

  function renderItem({ item }) {
    return (
      <TextCarouselItem {...item} />
    );
  }

  return (
    <FullScreenCarousel
      contentPosition="bottom"
      backgroundColor={theme.primaryColor}
      data={data}
      renderItem={renderItem}
      dotsColor={theme.greyishBackground}
      keyExtractor={(item) => item.text.primary}
    />
  );
};

export default PermissionsCarousel;
