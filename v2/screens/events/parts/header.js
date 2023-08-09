import React from 'react';

import HeaderBar from '../../../components/headerBar';
import Title from '../../../components/title';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';
import createStyle from '../../../utils/style';

const Header = () => {
  const {theme} = useLayoutContext();
  const {
    events,
    goToTagsFiltersScreen: handleFilter,
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  return (
    <HeaderBar
      backgroundColor={theme.whiteBackground}
      showShadow={events?.length <= 1}
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.primaryColor,
          onPress: handleBackPress,
        },
      ]}>
      <View
        style={[
          styles.container,
          {justifyContent: 'space-between', flexDirection: 'row'},
        ]}>
        <Title color={theme.primaryColor}>Agenda cultural</Title>
        <TouchableOpacity onPress={handleFilter}>
          <Icon name="funnel-outline" color={theme.primaryColor} size={20} />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity onPress={handleFilter} style={{position: 'absolute'}}>
        <Icon name="search-outline" color={theme.primaryColor} size={20} />
      </TouchableOpacity> */}
    </HeaderBar>
  );
};

const styles = createStyle({
  container: {
    width: '100%',
    // justifyContent: 'flex-start',
    textTransform: 'capitalize',
  },
});

export default Header;
