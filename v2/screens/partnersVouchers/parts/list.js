import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';

import SimpleVerticalList from '../../../components/verticalList/simple';
import Box from '../../../components/box';
import PaddingContainter from '../../../components/paddingContainer';
import PartnerVoucherListItem from '../../../components/listItem/partnerVoucher';

import {getCountdown} from '../../../utils/data';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import {ASSET_PREFIX} from '../../../constants/env';

const List = () => {
  const {theme} = useLayoutContext();
  const {
    data,
    loading,
    error,
    modifiedItem,
    goToPartnerVoucherDetailsScreenHOF: handleListItemPressHOF,
  } = useContext();
  const [now, setNow] = useState(new Date());
  const interval = useRef();
  const fakeData = [{index: -1}, {index: -2}, {index: -3}];

  useEffect(() => {
    interval.current = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval.current);
  }, []);

  function getShadow(index) {
    return index === 0
      ? 'bottom'
      : index + 1 === (loading === 'data' ? fakeData : data).length
      ? 'top'
      : 'both';
  }

  function renderItem({item, index}) {
    let shadow = getShadow(index);
    let status =
      new Date(item.launchDate) > new Date()
        ? {
            color: {
              background: theme.red__main,
              text: theme.contrastTextColor,
            },
            text:
              'Será liberado dia ' +
              moment(item.launchDate).format('DD/MM/YYYY'),
          }
        : {
            [undefined]: () =>
              item.available === 0
                ? {
                    color: {
                      background: theme.red__main,
                      text: theme.contrastTextColor,
                    },
                    text: 'Esgotado',
                  }
                : undefined,
            2: () => ({
              color: {
                background: theme.green__main,
                text: theme.contrastTextColor,
              },
              text:
                Number(item.activationType) === 1
                  ? 'Cupom ativo'
                  : 'Cupom ativo até ' +
                    getCountdown(
                      item.userStuff.updatedAt,
                      item.expirationTime,
                      now,
                    ),
              icon: Number(item.activationType) === 1 ? undefined : 'clock',
            }),
            3: () => ({
              color: {
                background: theme.primaryColor,
                text: theme.contrastTextColor,
              },
              text: 'Já utilizado',
            }),
          }[item.userStuff?.status]();

    return (
      <Box shadow={shadow}>
        <PaddingContainter>
          <PartnerVoucherListItem
            id={item.id}
            color={{
              status: status?.color,
              text: theme.textPrimaryColor,
            }}
            image={ASSET_PREFIX + item.image}
            status={status}
            placeProps={{
              image: ASSET_PREFIX + item.Partner.logo,
              title: item.Partner.fantasyName,
              descriptions: [item.Partner.Tag.name],
              color: {
                image: theme.primaryColor,
                title: theme.primaryColor,
              },
            }}
            text={{
              title: item.title,
              // availableQuantity: !item.userStuff ? item.available : undefined,
              // availableDescription: !item.userStuff ? (
              //   item.available === 1
              //     ? 'cupom dispónível.': 'cupons disponíveis.'
              // ) : undefined,
              // validDateMessage: moment(item.validDate).format('[Válido até] DD/MM/YYYY'),
              validDateMessage: '',
            }}
            onPress={handleListItemPressHOF(item)}
          />
        </PaddingContainter>
      </Box>
    );
  }

  function renderSkeleton({item, index}) {
    let shadow = getShadow(index);

    return (
      <Box shadow={shadow}>
        <PaddingContainter>
          <PartnerVoucherListItem.Skeleton
            id={item.index}
            color={{
              text: theme.textPrimaryColor,
              image: theme.primaryColor,
            }}
            placeProps={{
              color: {
                image: theme.primaryColor,
                title: theme.primaryColor,
              },
            }}
          />
        </PaddingContainter>
      </Box>
    );
  }

  if (error) {
    return null;
  }
  if (data?.length === 0) {
    return null;
  }

  return (
    <SimpleVerticalList
      data={loading === 'data' ? fakeData : data}
      extraData={[now, modifiedItem, loading]}
      renderItem={loading === 'data' ? renderSkeleton : renderItem}
      keyExtractor={item => String(item.index)}
    />
  );
};

export default List;
