import React from 'react';

import LoadingModal from '../../../components/loadingModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Checking = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    checking: visible,
  } = useContext();

  return (
    <LoadingModal
      visible={visible}
      iconColor={theme.contrastTextColor}
    />
  );
};

export default Checking;
