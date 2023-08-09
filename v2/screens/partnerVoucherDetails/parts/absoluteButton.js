import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';

import PaddingContainer from '../../../components/paddingContainer';
import FloatingButton from '../../../components/button/floating';
import createStyle from '../../../utils/style';
import { getCountdown } from '../../../utils/data';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const AbsoluteButton = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    data,
    getVoucher,
    copyCode,
  } = useContext();
  const [now, setNow] = useState(new Date());
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval.current);
  }, []);

  const propsByStatus =
    new Date(data.launchDate) > new Date()
      ? {
        text: 'Será liberado dia ' + moment(data.launchDate).format('DD/MM/YYYY'),
        colors: {
          main: theme.red__main,
          shadow: 'transparent',
          text: theme.contrastTextColor,
        },
      }
      : {
        [undefined]: () => (
          data.available === 0
            ? {
              text: 'Esgotado',
              colors: {
                main: theme.red__main,
                shadow: 'transparent',
                text: theme.contrastTextColor,
              },
            }
            : {
              text: 'Ativar este cupom',
              onPress: getVoucher,
              colors: {
                main: theme.secondColor,
                shadow: theme.primaryColor,
                text: theme.primaryColor,
              },
            }
        ),
        2: () => ({
          text: `Código: ${data.userStuff.code}` + (
            Number(data.activationType) === 1
              ? ''
              : ' por ' + getCountdown(data.userStuff.updatedAt, data.expirationTime, now)
          ),
          icon: Number(data.activationType) === 1 ? undefined : 'clock',
          onPress: Number(data.activationType) === 1 ? undefined : copyCode,
          colors: {
            main: theme.green__main,
            shadow: 'transparent',
            text: theme.contrastTextColor,
          },
        }),
        3: () => ({
          text: 'Já utilizado',
          colors: {
            main: theme.primaryColor,
            shadow: 'transparent',
            text: theme.contrastTextColor,
          },
        }),
      }[data.userStuff?.status]();

  return (
    <PaddingContainer
      style={styles.container}
      pointerEvents="box-none"
    >
      <FloatingButton
        {...propsByStatus}
        textSize="small"
      />
    </PaddingContainer>
  );
};

const styles = createStyle((theme) => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: theme.spacing(4.5),
    backgroundColor: 'transparent',
    zIndex: 200,
  },
}));

export default AbsoluteButton;
