import React from 'react';

import PaddingContainer from '../../../../components/paddingContainer';
import SearchInput from '../../../../components/input/search';

import createStyle from '../../../../utils/style';
import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../../context';

const SearchBox = () => {
  const {theme} = useLayoutContext();
  const {searchValue: value, setSearchValue} = useContext();

  function handleChange(e) {
    setSearchValue(e.nativeEvent.text);
  }

  return (
    <PaddingContainer
      style={[styles.container, {backgroundColor: theme.inputBackground}]}>
      <SearchInput
        color={{
          background: theme.whiteBackground,
          icon: theme.primaryColor,
          text: theme.inputTextColor,
        }}
        autoCapitalize="sentences"
        autoCompleteType="off"
        autoCorrect={false}
        placeholder="Pesquisar"
        returnKeyType="done"
        textContentType="none"
        value={value}
        onChange={handleChange}
      />
    </PaddingContainer>
  );
};

const styles = createStyle(theme => ({
  container: {
    paddingVertical: theme.spacing(2),
  },
}));

export default SearchBox;
