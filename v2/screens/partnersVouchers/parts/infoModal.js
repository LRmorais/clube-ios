import React from 'react';

import FeedbackModal from '../../../components/feedbackModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const InfoModal = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    infoModalVisible: visible,
    hideInfoModal: handleActionPress,
  } = useContext();

  return (
    <FeedbackModal
      visible={visible}
      title="Como funciona"
      description={[
        'Os Cupons do Clube são cupons de desconto com uma economia ainda mais especial para você, assinante!',
        '',
        'Como aproveitar os cupons:',
        '1. Acesse a oferta escolhida.',
        '2. Clique em “ativar o cupom” para resgatar a oferta.',
        '3. Confira o prazo de uso e informe o código do cupom ao estabelecimento quando for fazer sua compra.',
        '',
        'Importante:',
        'As ofertas disponíveis nesta seção possuem uma quantidade limitada e cada cupom pode ser resgatado somente uma vez por assinante.',
      ].join('\n')}
      action={{
        text: 'Fechar',
        onPress: handleActionPress,
      }}
      color={{
        background: theme.primaryColor,
        button: theme.primaryColorShade,
        text: theme.contrastTextColor,
      }}
    />
  );
};

export default InfoModal;
