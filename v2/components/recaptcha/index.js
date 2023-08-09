import React, { useState, useRef, useEffect } from 'react';
import WebView from 'react-native-webview';
import PropTypes from 'prop-types';

import createStyle from '../../utils/style';

const Recaptcha = ({
  executeKey,
  onToken,
}) => {
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  useEffect(() => {
    if (loading) return;
    if (!executeKey) return;

    ref.current.injectJavaScript(`
      try {
        window.getToken();
      } catch {}
      true;
    `);
  }, [executeKey, loading]);

  function handleLoadProgress(e) {
    if (e.nativeEvent.progress === 1) setLoading(false);
  }

  return (
    <WebView
      ref={ref}
      containerStyle={styles.container}
      originWhitelist={['*']}
      source={{
        uri: 'https://clube.gazetadopovo.com.br/recp.html',
      }}
      onLoadProgress={handleLoadProgress}
      onMessage={(e) => onToken(e.nativeEvent.data)}
    />
  );
};

Recaptcha.propTypes = {
  executeKey: PropTypes.string.isRequired,
  onToken: PropTypes.func.isRequired,
};

const styles = createStyle({
  container: {
    flex: 0,
    width: 0,
    height: 0,
  },
});

export default Recaptcha;
