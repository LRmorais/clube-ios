import React from 'react';

import LoadingModal from '../../../components/loadingModal';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';

const Loading = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    loading: visible,
  } = useContext();

  return (
    <LoadingModal
      visible={visible}
      iconColor={theme.constrastTextColor}
    />
  );
};

export default Loading;
