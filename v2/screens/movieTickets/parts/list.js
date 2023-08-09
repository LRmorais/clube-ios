import React from 'react';
import {Text} from 'react-native';
import {addDays, format, isAfter} from 'date-fns';

import SimpleVerticalList from '../../../components/verticalList/simple';
import PaddingContainer from '../../../components/paddingContainer';
import MovieTicketListItem from '../../../components/listItem/movieTicket';
import createStyle from '../../../utils/style';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const List = () => {
  const {theme} = useLayoutContext();
  const {tickets: data, loading, goToDiscountResultHOF} = useContext();

  function renderItem({item}) {
    function removeTime(date = new Date()) {
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
    }

    const today = new Date();
    const purchaseDate = new Date(item.orderDate);

    const expirationDateUser = addDays(purchaseDate, 30);
    const expirationDateReal = addDays(removeTime(purchaseDate), 31);

    const expirationDateFormated = format(expirationDateUser, 'd/MM/yyyy');
    let expired = isAfter(today, expirationDateReal);

    return (
      <PaddingContainer>
        <MovieTicketListItem
          id={+item.id}
          expired={expired}
          onPress={goToDiscountResultHOF(item)}
          text={{
            code: item.code,
            orderDate: format(purchaseDate, "d/MM/yyyy', às' HH:mm"),
            partner: item.partner.name,
            price: String(item.paidValue),
            validDate: expirationDateFormated,
            validDays: [
              item.sunday && 'DOM',
              item.monday && 'SEG',
              item.tuesday && 'TER',
              item.wednedday && 'QUA',
              item.thursday && 'QUI',
              item.friday && 'SEX',
              item.saturday && 'SÁB',
            ]
              .filter(Boolean)
              .join(' • '),
          }}
          color={{
            button: theme.secondColor,
            expired: theme.red__main,
            text: theme.primaryColor,
          }}
        />
      </PaddingContainer>
    );
  }

  return (
    <SimpleVerticalList
      data={data || []}
      renderItem={renderItem}
      keyExtractor={item => String(item.id)}
      showSeparator
      ListEmptyComponent={
        <Text style={[styles.noResults, {color: theme.textPrimaryColor}]}>
          {loading
            ? 'Carregando ingressos...'
            : 'Você ainda não comprou ingressos.'}
        </Text>
      }
    />
  );
};

const styles = createStyle(theme => ({
  noResults: {
    alignSelf: 'center',
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(21),
    textAlign: 'center',
  },
}));

export default List;
