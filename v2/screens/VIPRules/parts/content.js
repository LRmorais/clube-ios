import React from 'react';

import HTMLRenderer from '../../../components/htmlRenderer';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Content = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    sendLinkRecord: handleLinkPress,
  } = useContext();

  return (
    <HTMLRenderer
      style={[
        styles.content,
        { color: theme.textPrimaryColor },
      ]}
      onLinkPress={handleLinkPress}
    >
      {`
<p><b>O que é o Clube VIP?</b></p>
<p>O Clube VIP é uma área especial que preparamos aqui no aplicativo para valorizar ainda mais o nosso relacionamento. Todos os meses você pode virar VIP temporariamente e aproveitar descontos ainda maiores e outros benefícios exclusivos para quem é VIP.</p>
<br />
<p><b>Como me torno VIP?</b></p>
<p>Para se tornar VIP, basta utilizar <b>6 descontos</b> seja por QRCode ou validação de CPF em um mesmo mês. Por exemplo, do dia 1 ao dia 6 de janeiro você utilizou 06 descontos. Com isso, você adquire o status de VIP até o final do mês, podendo aproveitar todos os benefícios extras. Importante: a contagem reinicia ao início de cada mês.</p>
<br />
<p><b>Vou pagar a mais para ser VIP?</b></p>
<p>Não! O VIP é um bônus que criamos para premiar o seu aproveitamento do Clube Gazeta. Vire VIP e aproveite :)</p>
      `}
    </HTMLRenderer>
  );
};

const styles = createStyle((theme) => ({
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 21,
  },
}));

export default Content;
