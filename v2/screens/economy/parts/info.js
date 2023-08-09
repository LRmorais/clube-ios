import React from 'react';

import ImageEmpty from '../../../components/imageEmpty';
import { formatPrice } from '../../../utils/data';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Info = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
  } = useContext();
  const value = data
    .filter((item) => item.situation === 3)
    .reduce((accumative, current) => accumative += current.CouponsBook.value, 0);
  const introText = (
    value === 0
      ? 'Você ainda não economizou com os Cupons do Clube. Hoje pode ser um bom dia, que tal? :)'
      : 'Olha só quanto você já economizou com os Cupons do Clube!'
  );

  return (
    <ImageEmpty
      backgroundColor={theme.green__main}
      fillMode="wholeScreen"
      substractHeaderBar
      fontSize="big"
      imageProps={{
        source: require('../../../images/personas/economy.png'),
        align: 'top',
      }}
      introInfo={{
        text: introText,
        color: theme.contrastTextColor,
      }}
      mainInfo={{
        text: formatPrice(value),
        color: theme.VIPBackground,
      }}
    />
  );
};

export default Info;
