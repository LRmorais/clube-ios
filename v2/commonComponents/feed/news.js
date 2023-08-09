import React from 'react';

import CommonNewsCarousel from '../newsCarousel';
import { useLayoutContext } from '../../hocs/layout';

const Guides = () => {
  const {
    theme,
  } = useLayoutContext();

  return (
    <CommonNewsCarousel
    />
  );
};

export default Guides;
