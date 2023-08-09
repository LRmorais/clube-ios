import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import ImageWithLoading from '../../../components/imageWithLoading';
import createStyle from '../../../utils/style';
import { useLayoutContext } from '../../../hocs/layout';
import { useContext } from '../context';
import defaultImage from '../../../images/stuff/vouchersBanner.png';

const PartnersVouchers = () => {
  const {
    theme,
  } = useLayoutContext()
  const {
    goToPartnersVouchersScreen: handlePress,
  } = useContext();
  const [source, setSource] = useState(
    !!theme.couponsBanner
      ? { uri: theme.couponsBanner }
      : defaultImage
  );

  function handleError() {
    setSource(defaultImage);
  }

  return (
    <TouchableOpacity
      activeOpacity={.75}
      onPress={handlePress}
    >
      <ImageWithLoading
        style={styles.image}
        containerStyle={styles.imageContainer}
        source={source}
        onError={handleError}
      />
    </TouchableOpacity>
  );
};

const styles = createStyle({
  imageContainer: {
    borderRadius: 2,
    width: '100%',
    aspectRatio: 2 / 1,
  },
  image: {
    borderRadius: 2,
  },
});

export default PartnersVouchers;
