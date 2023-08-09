import React from 'react';
import {Text} from 'react-native';
import moment from 'moment';

import HTMLRenderer from '../../../components/htmlRenderer';
import Accordion from '../../../components/accordion';
import {formatPrice} from '../../../utils/data';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Info = () => {
  const {theme} = useLayoutContext();
  const {eventDetail, sendLinkRecord: handleLinkPress} = useContext();
  const tickets = eventDetail.eventPricings;

  const rulesContent = (
    <HTMLRenderer
      style={[styles.content, {color: theme.textPrimaryColor}]}
      onLinkPress={handleLinkPress}>
      {eventDetail.roles}
    </HTMLRenderer>
  );

  const ticketsContent = tickets && (
    <Text style={[styles.content, {color: theme.textPrimaryColor}]}>
      {tickets
        .map(ticket =>
          [
            moment(ticket.startDate).isValid() &&
              moment(ticket.endDate).isValid &&
              `De ${moment(ticket.startDate).format('DD/MM/YY')} a ${moment(
                ticket.endDate,
              ).format('DD/MM/YY')}`,
            `Lote ${ticket.lot}, ${ticket.section}`,
            `Preço cheio: ${formatPrice(ticket.fullValue)}`,
            `Preço do Clube: ${formatPrice(ticket.clubValue)}`,
          ]
            .filter(line => !!line)
            .join('\n'),
        )
        .join('\n\n')}
    </Text>
  );

  const rulesItem = {
    content: rulesContent,
    icon: 'info',
    title: 'Regras de uso',
    value: 'rules',
    color: {
      arrow: theme.secondColorShade,
      icon: theme.primaryColor,
      title: theme.primaryColor,
    },
  };

  const ticketsItem = ticketsContent && {
    content: ticketsContent,
    icon: 'voucher',
    title: 'Ingressos',
    value: 'tickets',
    color: {
      arrow: theme.secondColorShade,
      icon: theme.primaryColor,
      title: theme.primaryColor,
    },
  };

  const data = [rulesItem];
  if (ticketsItem) {
    data.push(ticketsItem);
  }

  return <Accordion data={data} multiple defaultSelected={['rules']} />;
};

const styles = createStyle(theme => ({
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: 20,
  },
}));

export default Info;
