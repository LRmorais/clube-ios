import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Categories from './parts/fullCategoriesSearch';
import Search from './parts/search';
import RecentSearch from './parts/recentSearch';
import Icon from 'react-native-vector-icons/FontAwesome';

import createStyle, {theme} from '../../../utils/style';

import {useContext} from './context';
import {useGlobalStateContext} from '../../../hocs/globalState';

const SearchArea = () => {
  const {visibleModalCategories, setVisibleModalCategories, setDisableScroll} =
    useGlobalStateContext();
  const {setData, originalData, setValueSearch} = useContext();

  Keyboard.addListener('keyboardDidShow');

  useEffect(() => {
    setDisableScroll(true);
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Modal
        testID={'modal'}
        isVisible={visibleModalCategories}
        style={styles.view}>
        <ScrollView scrollEventThrottle={0}>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => {
                setVisibleModalCategories(false);
                setDisableScroll(true);
                setData(originalData);
                setValueSearch('');
              }}>
              <Icon style={styles.icones} color="#000" name="times" size={20} />
            </TouchableOpacity>
            <Search />
            <RecentSearch />
            <Categories />
          </View>
        </ScrollView>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = createStyle(theme => ({
  view: {
    marginTop: 50,
    justifyContent: 'flex-end',
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  closeModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
}));

export default SearchArea;
