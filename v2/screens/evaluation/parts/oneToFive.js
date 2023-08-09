import React from 'react';
import { View } from 'react-native';

import StarRating from '../../../components/starRating';
import createStyle from '../../../utils/style';
import { useContext } from '../context';
import { useLayoutContext } from '../../../hocs/layout';

const OneToFive = () => {
  const {
    theme,
  } = useLayoutContext();
  const {
    rating: value,
    setRating,
    setTags,
  } = useContext();

  function handleChange(value) {
    setRating(value);
    setTags([]);
  }

  return (
    <View style={styles.container}>
      <StarRating
        value={value}
        onChange={handleChange}
        color={{
          checked: theme.VIPBackground,
          unchecked: theme.checkboxDefault,
        }}
      />
    </View>
  );
};

const styles = createStyle({
  container: {
    alignItems: 'center',
  },
});

export default OneToFive;
