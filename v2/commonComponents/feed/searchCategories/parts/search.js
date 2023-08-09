import React from 'react';
import SearchInput from '../../../../components/input/searchCategories';
import {useLayoutContext} from '../../../../hocs/layout';
import {useContext} from '../context';

const Header = () => {
  const {theme} = useLayoutContext();
  const {inputRef, setValueSearch, valueSearch, handleChange} = useContext();

  const clean = () => {
    inputRef.current.clear();
    handleChange('');
    setValueSearch('');
  };

  return (
    <>
      <SearchInput
        color={{
          background: '#f7f7f7',
          icon: theme.primaryColor,
          text: theme.inputTextColor,
        }}
        autoCapitalize="words"
        autoCompleteType="off"
        autoCorrect={false}
        placeholder="Pesquisar"
        returnKeyType="done"
        textContentType="none"
        inputRef={inputRef}
        autoFocus
        value={valueSearch}
        onChangeText={s => {
          handleChange(s);
          setValueSearch(s);
        }}
        press={clean}
      />
    </>
  );
};

export default Header;
