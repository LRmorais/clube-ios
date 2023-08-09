import React from 'react';

import Divider from '../../../components/divider';
import { useContext } from '../context';

const LogicDivider = () => {
  const {
    screenPalette,
  } = useContext();

  return (
    <Divider color={screenPalette.divider} />
  );
};

export default LogicDivider;
