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
<p>O CLUBE é um aplicativo desenvolvido, operado e oferecido por EDITORA GAZETA DO POVO S.A. (adiante denominada “GAZETA” ou “CLUBE”), inscrita no Cadastro Nacional de Pessoas Jurídicas (CNPJ) sob nº76.530.047/0001-29, com sede na Avenida Victor Ferreira do Amaral, 306, Tarumã, Curitiba, Paraná. CEP 82530-230.</p>
<p>Clube Gazeta é um aplicativo que permite aos seus usuários, assinantes (neste caso “Usuário” ou “Você”), aproveitar todos os benefícios e descontos provenientes dos convênios e parcerias celebrados para o CLUBE em diversos estabelecimentos comerciais.</p>
<p>Estes Termos e Condições de Uso, em conjunto com os demais contratos assumidos por Você e a nossa Política de Privacidade, estabelecem os termos e condições aplicáveis à utilização de nosso Aplicativo e aos serviços que serão prestados pelo Clube à Você. É muito importante que Você leia e compreenda estas regras, bem como outras regras que possam ser aplicáveis.</p>
<p>Estes Termos e Condições de Uso podem ser alterados a qualquer momento. Caso Você não concorde com alguma mudança feita nestes termos, <u>recomendamos que encerre sua conta e interrompa a utilização do Aplicativo</u>. A última versão destes Termos e Condições de Uso sempre estará disponível em <a href="https://clube.gazetadopovo.com.br/sobre-o-clube/termo-de-uso/">https://clube.gazetadopovo.com.br/sobre-o-clube/termo-de-uso/</a>. Salientamos que tais alterações serão aplicáveis aos nossos serviços prestados a Você desde o momento em que forem disponibilizadas no Aplicativo e no site. Algumas condições disponíveis em avisos legais em outros locais do Aplicativo ou do site podem substituir ou complementar estes Termos e Condições de Uso, que será sempre aplicado em conjunto com a política de privacidade.</p>
<p>Qualquer pessoa que utilizar nossos serviços, o que inclui a simples visita ao Aplicativo ou ao site, assume e expressamente concorda com estes Termos e Condições de Uso.</p>
<p>O Clube Gazeta é válido para assinatura digital completa e assinatura impresso + digital (todos os dias e fins de semana) ou mesmo para assinatura light + CLUBE.</p>
<p>1. SOBRE O APLICATIVO</p>
<p>1.1. O Aplicativo provê a Você uma ferramenta para encontrar e comparar com maior facilidade ofertas de produtos ou serviços oferecidos por estabelecimentos comerciais (doravante denominados apenas “Estabelecimentos Ofertantes”) conveniados à Gazeta.</p>
<p>1.2. O CLUBE não cobra quaisquer valores diretamente dos Usuários. O Aplicativo é remunerado, entre outras formas, pela venda dos planos para a gestão de parcerias pelas Organizações participantes da plataforma. Nenhuma pessoa está autorizada a cobrar taxas de Você pelo uso do Aplicativo em nome da GAZETA.</p>
<p>1.3. As ofertas visualizadas no Aplicativo são disponibilizadas pela GAZETA e pelos Estabelecimentos Ofertantes.</p>
<p>1.4. Para ofertar-lhe os todas as funcionalidades do aplicativo, oferecendo a melhor experiência para Você, coletamos e tratamos os seguintes dados:</p>
<p>1.4.1. Geolocalização;</p>
<p>1.4.2. Utilização dos cupons;</p>
<p>1.4.3. Utilização descontos através da leitura de QRCode,  validação por CPF dentro do estabelecimento ofertante ou integração de sistemas;</p>
<p>1.4.4. Interesse em eventos através do acesso a página que descreve o evento, compra de ingresso dentro do próprio aplicativo ou link disponibilizado pelo Estabelecimento Ofertante;</p>
<p>1.4.5. Interesse em Estabelecimento Ofertante através do acesso a sua página dentro do aplicativo ou site;</p>
<p>1.4.6. Interesse em categoria de Estabelecimento Ofertante através da navegação dentro do aplicativo ou site;</p>
<p>1.4.7. Quando uma compra é efetuada dentro da plataforma, valores da transação;</p>
<p>2. Limitação de Responsabilidades</p>
<p>2.1. Em função do disposto no item 1, acima, a GAZETA é responsável:</p>
<p>2.1.1. Por incorporar atualizações ao Aplicativo, bem como por disponibilizar suporte e atendimento remoto aos usuários sobre dificuldades, dúvidas ou problemas com o uso do Aplicativo, devendo recebê-las através do formulário Fale Conosco disponível no aplicativo e site e resolvê-las junto aos estabelecimentos parceiros, quando necessário, prestando esclarecimentos ao usuário que encaminhou a solicitação.</p>
<p>3. Disponibilidade do Aplicativo</p>
<p>3.1. A GAZETA irá empreender seus melhores esforços para garantir a maior disponibilidade possível do Aplicativo e de seus serviços. Todavia, caso ocorra indisponibilidade do Aplicativo ou de seus serviços, por qualquer período ou momento, avise-nos através de <a href="https://www.gazetadopovo.com.br/fale-conosco/">https://www.gazetadopovo.com.br/fale-conosco/</a>.</p>
<p>3.2. O acesso ao Aplicativo pode ser interrompido, suspenso ou ficar intermitente temporariamente, sem qualquer aviso prévio, em caso de falha de sistema, manutenção, alteração de sistemas, ou por qualquer motivo que escape ao controle da GAZETA.</p>
<p>4. Benefícios e Forma de Utilização</p>
<p>4.1. O Conteúdo a ser disponibilizado a Você no Aplicativo pode variar entre vales/cupons de produtos e serviços da GAZETA e/ou de seus parceiros, bem como descontos, exclusivos ou não, em produtos e serviços da GAZETA e/ou de seus parceiros.</p>
<p>4.2. O Aplicativo pode eventualmente oferecer outros benefícios, que serão devidamente apresentados a Você.</p>
<p>4.3. As informações e regras para a utilização dos benefícios, sejam elas de qualquer espécie, incluindo, mas não se limitando a: descrição do produto, serviço ou desconto oferecido, forma de resgate e/ou utilização, limitação por usuário, limitação por localidade, limitação de unidades de produtos ou uso de serviços e prazo para utilização/resgate estarão disponíveis dentro de cada oferta presente no Aplicativo, podendo uma oferta ter regras de utilização diferentes de outra.</p>
<p>4.4. Você deverá ativar o(s) benefício(s) escolhido(s) no Aplicativo e resgatá-lo(s) conforme as instruções descritas em cada oferta. A ativação acontece clicando no botão “Gerar Cupom” ou “Visitar Site” que aparece dentro de cada oferta que é apresentada no Aplicativo.</p>
<p>4.5. Se Você não fizer o resgate/utilização dentro do prazo e condições descritas na oferta, não poderá utilizar o benefício. Uma vez solicitado não há possibilidade de alteração ou cancelamento do benefício.</p>
<p>4.6. O uso do Aplicativo é pessoal e intransferível. Desta maneira, é terminantemente proibida a venda, revenda, compartilhamento, cessão ou empréstimo de cupons de desconto para produtos ou serviços adquiridos no CLUBE para o uso de terceiros.</p>
<p>4.7. Você reconhece que, ao ativar uma oferta no Aplicativo, Você assume e expressamente concorda com as Condições e Termos para sua utilização, que foram disponibilizados a Você na descrição da oferta.</p>
<p>5. Utilização do Aplicativo</p>
<p>5.1. Você concorda em usar este Aplicativo de boa-fé, sem usar, carregar, transmitir ou enviar do Aplicativo ou para o Aplicativo qualquer material:</p>
<p>5.1.1. Que seja de cunho violento ou ameaçador, difamatório, obsceno, ofensivo, pornográfico, abusivo, passível de incitar qualquer forma de ódio racial, discriminatório ou em violação de privacidade de terceiro.</p>
<p>5.1.2. Para o qual não tenham sido obtidas pelo usuário todas as licenças e/ou aprovações necessárias.</p>
<p>5.1.3. Que constitua ou incite condutas que possam ser consideradas ilícitos criminais ou civis, que violem direitos de terceiros seja no Brasil ou no exterior ou que sejam meramente ilegais sob qualquer outra forma.</p>
<p>5.1.4. Que sejam tecnicamente danosas, incluindo, mas não limitado a vírus de computador, macros, “cavalos de tróia”, worms, componentes maliciosos, dados corrompidos e outros programas ou dados de computador maliciosos ou que sejam projetados para interferir, interromper ou derrubar as operações normais de um computador.</p>
<p>5.1.5. Que tenha como objetivo fraudar, dissimular ou comprometer o bom funcionamento do Aplicativo ou a escolha dos usuários quanto à adesão a ofertas e parcerias, seja pela criação de perfis falsos, violação de protocolos de segurança ou qualquer outro meio/.</p>
<p>5.2. Você deve zelar para que seu uso do Aplicativo e dos serviços não seja prejudicial à estabilidade e disponibilidade destes. Caso isso ocorra, Você poderá ser responsabilizado pelos prejuízos a que der causa.</p>
<p>5.3. A GAZETA poderá, a qualquer momento e a seu exclusivo critério e sempre com vistas a aprimorar a experiência dos usuários, adicionar ou remover conteúdos e funcionalidades do Aplicativo sem que isso caracterize, sob qualquer forma, ofensa a direito adquirido dos usuários.</p>
<p>5.4. A GAZETA poderá ser requerida a cooperar com autoridades e com diligências judiciais que visem a identificar os usuários que atuem em descumprimento com as disposições deste item 4.</p>
<p>6. Direitos de Propriedade Intelectual</p>
<p>6.1. O uso comercial do nome, dos desenhos e da expressão “Clube ou Clube Gazeta” como nome empresarial, marca ou nome de domínio, bem como os conteúdos das telas relativas aos serviços e do Aplicativo em si, assim como os programas, bancos de dados, documentos e demais utilidades e aplicações que permitem ao usuário acessar e usar os  nossos serviços são de propriedade da GAZETA e estão protegidos por todas as leis e tratados aplicáveis.</p>
<p>6.2. O uso indevido e a reprodução total ou parcial dos conteúdos referidos no item 5.1 são proibidos. Caso deseje utilizar algum destes conteúdos, Você deverá entrar em contato conosco antes de fazê-lo. Usar qualquer conteúdo aqui mencionado sem a nossa prévia e expressa autorização poderá acarretar em responsabilizações penais e civis.</p>
<p>7. Links</p>
<p>7.1. Em virtude de nossas próprias parcerias ou por acreditarmos que possa ser de seu interesse, nós poderemos “linkar” em nosso Aplicativo, a nosso exclusivo critério, outros aplicativos ou websites e funcionalidades da internet, sem que isso signifique que esses websites sejam de propriedade ou operados pela GAZETA.</p>
<p>7.2. Nem a GAZETA ou o CLUBE serão responsáveis pelos conteúdos, práticas e serviços ofertados por estes websites. Orientamos tomar conhecimento das políticas específicas desses sites antes de adotar a utilização.</p>
<p>7.3. A disponibilização de links para outros websites não implica em relação de sociedade, de supervisão, de cumplicidade, solidariedade ou de garantia da GAZETA  para com esses websites e seus conteúdos.</p>
<p>8. Privacidade</p>
<p>8.1. A privacidade dos usuários é muito importante para a GAZETA. Ao nos prover com suas informações pessoais, Você nos autoriza a divulgar e/ou utilizar estas informações estritamente nos termos previstos na nossa Política de Privacidade, que está disponível em <a href="https://www.gazetadopovo.com.br/politica-de-privacidade/">https://www.gazetadopovo.com.br/politica-de-privacidade/</a>.</p>
<p>9. Cadastro e Registro</p>
<p>9.1. Quando Você completa o cadastro feito em decorrência da aquisição de sua assinatura junto à GAZETA ou CLUBE, Você atesta que todos os dados fornecidos por Você são verdadeiros, completos e precisos, e que concordou com todos os termos de uso e privacidade.</p>
<p>9.1.1. Prover informações incompletas, imprecisas ou falsas constitui violação dos deveres destes Termos e Condições de Uso, estando o usuário inteiramente responsável pelos danos a que tal violação der causa.</p>
<p>9.1.2. A GAZETA e o CLUBE podem necessitar de mais informações e documentos sobre Você a qualquer tempo, seja para melhor identificá-lo ou para conduzir diligências internas, caso em que Você será requerido a fornecê-las. Não fornecer prontamente tais informações e documentos quando requisitado constituirá violação destes Termos e Condições de Uso.</p>
<p>9.2. As informações que Você utilizar para preencher o nosso cadastro podem mudar, e Você assume o compromisso de mantê-las sempre atualizadas, alterando-as tão logo ocorra alguma modificação.</p>
<p>9.3. A GAZETA  poderá se valer de todas as formas lícitas para verificar, a qualquer tempo, se as informações que Você nos proveu são verdadeiras.</p>
<p>9.3.1. Se a GAZETA constatar que suas informações são de alguma forma incompletas, imprecisas ou falsas, Você poderá ter sua conta suspensa ou cancelada, a nosso exclusivo critério, sem prejuízos de outras medidas que sejam aplicáveis, caso em que não serão devidos quaisquer reembolsos.</p>
<p>9.4. O cadastro no Aplicativo é pessoal e intransferível.</p>
<p>9.5. Cada usuário só poderá manter um único cadastro junto ao Aplicativo.</p>
<p>9.6. A GAZETA e CLUBE empregam seus melhores esforços para garantir a segurança do seu cadastro, contudo, o sigilo e a segurança do seu nome de usuário e senha são de sua única e exclusiva responsabilidade.</p>
<p>10. Adesão a Parcerias</p>
<p>10.1. Adesão das parcerias é feita exclusivamente pela GAZETA.</p>
<p>10.2. Ao se cadastrar no Aplicativo, iremos enviar nossos melhores esforços para garantir que Você, Usuário, receba prioritariamente as ofertas mais adequadas ao seu interesse. Entretanto, não garantimos que as ofertas que enviaremos sempre serão adequadas ao seu interesse. Para melhor oferta de produtos, podemos utilizar de mecanismos de geolocalização, dados, etc.</p>
<p>10.3. Recomendamos que Você sempre haja com cautela com todas as promoções e parcerias que Você recebe do Aplicativo, analisando detidamente as informações que forem fornecidas.</p>
<p>10.4. A GAZETA disponibilizará avaliações, recomendações e comentários dos usuários para ajudá-lo na escolha das melhores parcerias. Entretanto, isso não significa a prestação de qualquer garantia por parte da GAZETA a qualquer Estabelecimento Ofertante, independente da sua avaliação.</p>
<p>11. Rescisão</p>
<p>11.1. Para promover o bom funcionamento e qualidade dos serviços do Aplicativo, a GAZETA se reservam no direito de, sem a necessidade de notificação prévia, impedir ou interromper o acesso do usuário que, segundo nossos critérios, estiver atuando de qualquer forma a violar qualquer disposição destes Termos e Condições de Uso, da Política de Privacidade ou de qualquer contrato celebrado por meio do Aplicativo.</p>
<p>12. Demais Condições</p>
<p>12.1. O Aplicativo e seus serviços são criados e mantidos em fiel cumprimento às leis brasileiras e demais tratados que são incorporados à jurisdição brasileira.</p>
<p>12.2. Caso a GAZETA deixe de exercer qualquer direito previsto nestes Termos e Condições de Uso, isto não deverá ser interpretado como uma renúncia, abdicação ou revogação de disposição constante destes Termos e Condições de Uso.</p>
<p>12.3. Todos os itens destes Termos e Condições de Uso serão regidos pelas leis vigentes da República Federativa do Brasil. Para dirimir quaisquer controvérsias é eleito o Foro Central da Comarca da Região Curitiba, Paraná.</p>
<p>Curitiba, 25 de agosto de 2020.</p>
      `}
    </HTMLRenderer>
  );
};

const styles = createStyle((theme) => ({
  content: {
    paddingBottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 21,
  },
}));

export default Content;
