import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

import SimpleVerticalList from '../../../components/verticalList/simple';
import SumUserInfo from '../../../components/userInfo/sum';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Request = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
  } = useContext();

  function renderItem({ item }) {
    return (
      <SumUserInfo
        image={{ uri: 'https://clube-static.clubegazetadopovo.com.br/images/users/1582220891432.png' }}
        text={{
          primary: item.dataGazeta?.displayName || item.dataGazeta?.name,
          secondary: moment(item.createdAt).fromNow(),
        }}
        color={{
          image: theme.tertiaryColor,
          text: {
            primary: theme.textPrimaryColor,
            secondary: theme.textPrimaryColor,
          },
        }}
      />
    );
  }

  if (!data) return null;

  return (
    <SimpleVerticalList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      showSeparator
      separatorColor={theme.dividerColor}
    />
  );
};

export default Request;