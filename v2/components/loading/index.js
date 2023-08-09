import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Box from '../box';
import PaddingContainer from '../paddingContainer';
import createStyle from '../../utils/style';

const Loading = (props) => {
  const Children = props.children;

  if (!props.loading) return (
    <Children />
  );

  return (
    <Box>
      <PaddingContainer style={styles.container}>
        <Text style={[
          styles.text,
          { color: props.color },
        ]}>
          {props.message}
        </Text>
        <ActivityIndicator
          size="small"
          color={props.color}
        />
      </PaddingContainer>
    </Box>
  );
};

Loading.propTypes = {
  children: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

Loading.defaultProps = {
  message: 'Carregando...',
};

const styles = createStyle((theme) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    marginRight: theme.spacing(1),
    fontFamily: theme.typography.fontFamily.different,
    fontSize: theme.typography.fontSize.__zeplinSpToPx(16),
  },
}));

export default Loading;
