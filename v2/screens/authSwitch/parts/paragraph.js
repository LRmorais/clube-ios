import React from 'react';
import { Text } from 'react-native';

import createStyle from '../../../utils/style';
import { useContext } from '../context';

const Paragraph = () => {
  const {
    screenPalette,
  } = useContext();

  return (
    <Text style={[
      styles.paragraph,
      { color: screenPalette.text.paragraph },
    ]}>
      Assinante <Text style={styles.bold}>Clube Gazeta do Povo</Text> aproveita ainda mais a cidade e ainda economiza em <Text style={styles.bold}>mais de 1000</Text> estabelecimentos parceiros!
    </Text>
  );
};

const styles = createStyle((theme) => ({
  paragraph: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
    lineHeight: 28,
  },
  bold: {
    fontFamily: theme.typography.fontFamily.bold,
  },
}));

export default Paragraph;
