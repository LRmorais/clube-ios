import React from 'react';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';

import createStyle from '../../../utils/style';
import { useContext } from '../context';

const Content = () => {
  const {
    url,
    setLoading,
    openLink: handleLinkPress,
  } = useContext();
  const uri = url + 'mobile/';

  function handleLoadProgress(e) {
    if (e.nativeEvent.progress >= 0.8) setLoading(false);
  }

  function handleShouldStartLoadWithRequest(request) {
    if (Platform.OS === 'android' && request.navigationType === 'other') {
      handleLinkPress(request.url);
      return false;
    }
    if (Platform.OS === 'ios' && request.navigationType === 'click') {
      handleLinkPress(request.url);
      return false;
    }

    setLoading(request.loading);
    return true;
  }

  return (
    <WebView
      containerStyle={styles.container}
      source={{ uri }}
      onLoadProgress={handleLoadProgress}
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = createStyle({
  container: {
    flex: 1,
  },
});

export default Content;
