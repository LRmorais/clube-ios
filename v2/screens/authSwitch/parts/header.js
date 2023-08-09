import React from 'react';

import HeaderBar from '../../../components/headerBar';
import { useContext } from '../context';

const Header = () => {
  const {
    screenPalette,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={screenPalette.header.background}
      onlyStatusBar
    />
  );
};

export default Header;
