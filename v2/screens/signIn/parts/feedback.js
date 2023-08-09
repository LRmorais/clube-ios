import React from 'react';
import {Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {theme} from '../../../utils/style';
import FeedbackModal from '../../../components/feedbackModal';
import {useContext} from '../context';

const Feedback = () => {
  const {
    screenPalette,
    feedback,
    staticTheme,
    hideFeedback: handleActionPress,
    openStore: handleWrongAppPress,
  } = useContext();

  const propsByFeedback = {
    [undefined]: {},
    wrong: {
      title: 'Falha no login',
      description: [
        'Problemas com o acesso ? A gente ajuda você :)',
        'Mande uma mensagem pelo whats!',
      ],
      icon: 'error',
      action: {
        text: 'Voltar',
        onPress: handleActionPress,
      },
      extraActions: [
        {
          text: 'Enviar mensagem',
          color: '#DDFFED',
          icon: <Icon color={'#494D4B'} name="whatsapp" size={16} />,
          onPress: async() => {
            await Linking.openURL(
              "whatsapp://send?text=Preciso de ajuda para recuperar minha senha. &phone=+554192808632")
          },
        },
      ],
      extraStyles: {
        textAlign: 'left',
      },
    },
    any: {
      title: 'Oops...',
      description:
        'Houve algum problema na requisição. Por favor, tente novamente.',
      icon: 'error',
      action: {
        text: 'Tentar novamente',
        onPress: handleActionPress,
      },
    },
    wrongApp: {
      title: 'Oops...',
      description: `Você é um usuário ${staticTheme?.title}. Baixe o app Clube Empresas prara continuar.`,
      icon: 'error',
      action: {
        text: 'Ir para a loja',
        onPress: handleWrongAppPress,
      },
    },
  }[feedback];

  return (
    <FeedbackModal
      visible={!!feedback}
      color={screenPalette.feedback}
      {...propsByFeedback}
    />
  );
};

export default Feedback;
