import React from 'react';
import { View } from 'react-native';

import HTMLRenderer from '../../../components/htmlRenderer';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';

const Explanation = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.secondColorShade },
    ]}>
      <HTMLRenderer
        style={[
          styles.content,
          { color: theme.primaryColor },
        ]}
      >
        {'<p><b>Aqui você pode acompanhar quais dos seus amigos assinaram o Clube utilizando o seu link.</b></p>'}
      </HTMLRenderer>
    </View>
  );
};

const styles = createStyle((theme) => ({
  container: {
    paddingVertical: theme.spacing(2),
    paddingHorizontal: theme.spacing(1.5),
    borderRadius: 2,
  },
  content: {
    fontFamily: theme.typography.fontFamily.regular,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(14),
    lineHeight: 21,
    textAlign: 'center',
  },
}));

export default Explanation;
