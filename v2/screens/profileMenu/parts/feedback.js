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
    deteleAcount,
    hideFeedback: handleActionPress,
  } = useContext();

  const propsByFeedback = {
    [undefined]: {},
    wrong: {
      title: 'Excluir Conta',
      description: ['Você tem certeza que deseja excluir sua conta ?'],
      icon: 'error',
      action: {
        text: 'Sim',
        onPress: deteleAcount,
      },
      actionDeleteAcount: {
        text: 'Voltar',
        onPress: handleActionPress,
      },
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
        text: 'Voltar',
        onPress: handleActionPress,
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
