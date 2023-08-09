import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

import SimpleVerticalList from '../../../components/verticalList/simple';
import PaddingContainer from '../../../components/paddingContainer';
import RatingUserInfo from '../../../components/userInfo/rating';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Ratings = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    loadingData,
  } = useContext();
  const fakeData = [{ id:-4 }, { id:-3 }, { id:-2 }, { id:-1 }];
  const color = {
    image: theme.secondColorShade,
    icon: theme.VIPBackground,
    number: theme.VIPBackground,
    description: theme.textPrimaryColor,
    text: {
      primary: theme.textPrimaryColor,
      secondary: theme.textPrimaryColor,
    },
    VIP: {
      background: theme.VIPBackground,
      text: theme.VIPBackground,
      icon: theme.primaryColorShade,
    },
  };

  function renderSkeleton() {
    return (
      <PaddingContainer>
        <RatingUserInfo.Skeleton
          color={color}
        />
      </PaddingContainer>
    );
  }

  function renderItem({ item }) {
    return (
      <PaddingContainer>
        <RatingUserInfo
          text={{
            primary: item.name,
            secondary: moment(item.createdAt).fromNow(),
          }}
          // isVIP
          color={color}
          image={require('../../../images/personas/avatar.png')}
          rating={{
            number: Number(item.scoreClient),
            description: item.publicComment || 'Nenhuma descrição',
          }}
        />
      </PaddingContainer>
    );
  }

  if (data && data.length === 0) return null;

  return (
    <SimpleVerticalList
      data={loadingData ? fakeData : data}
      renderItem={loadingData ? renderSkeleton : renderItem}
      keyExtractor={(_, index) => String(index)}
      showSeparator
      separatorColor={theme.dividerColor}
    />
  );
};

export default Ratings;
