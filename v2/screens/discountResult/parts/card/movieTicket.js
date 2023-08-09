import React from 'react';
import {addDays, format} from 'date-fns';

import PaddingContainer from '../../../../components/paddingContainer';
import Card from '../../../../components/movieTicketCard';
import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../../context';

const MovieTicketCard = () => {
  const {theme} = useLayoutContext();
  const {thing: ticket, loadingVouchers: loading, getVouchers} = useContext();
  const days = [
    ticket.sunday && 'DOM',
    ticket.monday && 'SEG',
    ticket.tuesday && 'TER',
    ticket.wednedday && 'QUA',
    ticket.thursday && 'QUI',
    ticket.friday && 'SEX',
    ticket.saturday && 'SÁB',
  ]
    .filter(Boolean)
    .join(' • ');

  const ticketCodeSplit = ticket?.code?.split('-');

  const purchaseDate = new Date(ticket?.orderDate);

  const more30days = addDays(purchaseDate, 30);

  const expirationDate = format(more30days, 'd/MM/yyyy');

  return (
    <PaddingContainer>
      <Card
        color={{
          background: theme.whiteBackground,
          text: theme.primaryColor,
        }}
        text={{
          bottom: 'Informe este código para resgatar seu ingresso.',
          // main: ticketCodeSplit.length === 1 ? ticket.code : ticketCodeSplit,
          main: ticketCodeSplit,
          orderDate: format(purchaseDate, "d/MM/yyyy', às' HH:mm"),
          title:
            ticket.roomType === 'others'
              ? `${ticket.room} | ${days}`
              : `Ingresso ${ticket.movieType} | ${days}`,
          validDate: expirationDate,
        }}
      />
    </PaddingContainer>
  );
};

export default MovieTicketCard;
