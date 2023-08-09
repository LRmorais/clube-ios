import React from 'react';

import ImageWithLoading from '../../../components/imageWithLoading';
import createStyle from '../../../utils/style';

const Logo = () => (
  <ImageWithLoading
    containerStyle={styles.logo}
    source={require('../../../images/logo/yellow.png')}
  />
);

const styles = createStyle({
  logo: {
    width: 74,
    aspectRatio: 159 / 146,
  },
});

export default Logo;
