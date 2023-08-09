import React from 'react';
import { View, Text } from 'react-native';

import PaddingContainer from '../../../components/paddingContainer';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Numbers = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    notUsed,
  } = useContext();

  if (!data) return null;

  const Item = ({ number, prefix, text }) => (
    <View style={styles.item}>
      {prefix && (
        <Text style={[
          styles.prefix,
          { color: theme.contrastTextColor },
        ]}>
          {prefix}
        </Text>
      )}
      <Text style={[
        styles.number,
        { color: theme.contrastTextColor },
      ]}>
        {number}
      </Text>
      <Text style={[
        styles.text,
        { color: theme.contrastTextColor },
      ]}>
        {text}
      </Text>
    </View>
  );

  return (
    <PaddingContainer style={[
      styles.container,
      { backgroundColor: theme.primaryColor },
    ]}>
      <Item number={notUsed} text={'Amigos\nIndicados'} />
      <Item number={notUsed * 10} prefix="R$" text={'Saldo\nAcumulado'} />
    </PaddingContainer>
  );
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2.5),
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(40),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(44),
  },
  prefix: {
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(.5),
    fontFamily: theme.typography.fontFamily.bold,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
  text: {
    marginLeft: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(12),
    lineHeight: theme.typography.fontSize.__zeplinSpToPx(18),
  },
}));

export default Numbers;