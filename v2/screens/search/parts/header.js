import React from 'react';

import HeaderBar from '../../../components/headerBar';
import SearchInput from '../../../components/input/search';
import {useLayoutContext} from '../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {
    searchValue: value,
    setSearchValue,
    inputRef,
    getNews,
    getPlaces,
    getEvents,
    returnToPreviousScreen: handleBackPress,
  } = useContext();

  function handleChange(e) {
    let query = e.nativeEvent.text;
    setSearchValue(query);
    getNews(query);
    // getPlaces(query);
    // getEvents(query);
  }

  return (
    <HeaderBar
      backgroundColor={theme.primaryColor}
      showShadow
      leftIcons={[
        {
          id: 'return-arrow',
          backgroundColor: 'transparent',
          iconColor: theme.contrastTextColor,
          onPress: handleBackPress,
        },
      ]}>
      <SearchInput
        color={{
          background: theme.whiteBackground,
          icon: theme.primaryColor,
          text: theme.inputTextColor,
        }}
        autoCapitalize="words"
        autoCompleteType="off"
        autoCorrect={false}
        placeholder="Pesquisar"
        returnKeyType="done"
        textContentType="none"
        // inputRef={inputRef}
        autoFocus
        value={value}
        onChange={handleChange}
      />
    </HeaderBar>
  );
};

export default Header;
