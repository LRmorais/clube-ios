import React from 'react';

import LoadingModal from '../../../components/loadingModal';
import {useContext} from '../context';

const Loading = () => {
  const {screenPalette, loading: visible} = useContext();

  return <LoadingModal visible={visible} iconColor={screenPalette.loading} />;
};

export default Loading;
