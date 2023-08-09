import React from 'react';
import {View, Text} from 'react-native';

import {lightFormat} from 'date-fns';

import Box from '../../../components/box';
import PaddingContainer from '../../../components/paddingContainer';
import {formatPrice} from '../../../utils/data';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import createStyle from '../../../utils/style';

const Infos = () => {
  const {theme} = useLayoutContext();
  const {eventDetail} = useContext();

  const tickets = eventDetail.eventPricings;

  return (
    <Box>
      <PaddingContainer>
        <View>
          <Text style={[styles.title, {color: theme.primaryColor}]}>
            Ingressos
          </Text>

          {tickets
            ? tickets.map(ticket => {
                let formatStart = new Date(ticket.startDate);
                let formatEnd = new Date(ticket.endDate);
                let startDate = lightFormat(formatStart, 'dd/MM/yyyy');
                let endDate = lightFormat(formatEnd, 'dd/MM/yyyy');
                return (
                  <View style={{marginVertical: 10}}>
                    <Text style={[styles.texts, {color: theme.primaryColor}]}>
                      {`Lote: ${ticket.lot}`}
                      {'\n'}
                      {`Setor: ${ticket.section}`}
                    </Text>
                    <Text
                      style={[
                        styles.secondTexts,
                        {color: theme.primaryColor},
                      ]}>{`De ${startDate} a ${endDate}`}</Text>
                    <Text
                      style={[
                        styles.secondTexts,
                        {color: theme.primaryColor},
                      ]}>{`Preço cheio: ${formatPrice(
                      ticket.fullValue,
                    )}`}</Text>
                    <Text
                      style={[
                        styles.secondTexts,
                        {color: theme.primaryColor},
                      ]}>{`Preço do Clube: ${formatPrice(
                      ticket.clubValue,
                    )}`}</Text>
                  </View>
                );
              })
            : null}
        </View>
      </PaddingContainer>
    </Box>
  );
};

const styles = createStyle(theme => ({
  title: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  texts: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.spacing(2),
  },
  secondTexts: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: theme.spacing(3),
  },
}));

export default Infos;
