import React from 'react';

import HeaderBar from '../../../components/headerBar';
import { useLayoutContext } from '../../../hocs/layout';

const Header = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      onlyStatusBar
    />
  );
};

export default Header;
