import React from 'react';
import {StatusBar, View, ImageBackground, Image, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import PropTypes from 'prop-types';

import ListCircleIcons from '../icons/listCircle';
import {sizes} from '../icons/circle';
import {isLight} from '../../utils/color';
import createStyle from '../../utils/style';
import {useLayoutContext} from '../../hocs/layout';

export const NewHeaderBar = props => {
  const {headerBarHeight} = useLayoutContext();

  const statusBarBackground =
    props.statusBarProps.backgroundColor || props.backgroundColor;
  const barStyle = {
    [null]: 'default',
    [true]: 'dark-content',
    [false]: 'light-content',
  }[isLight(statusBarBackground)];

  return (
    <>
      <StatusBar
        animated
        {...props.statusBarProps}
        backgroundColor={statusBarBackground}
        barStyle={barStyle}
      />
      {!props.onlyStatusBar && (
        <View
          style={[
            styles.container,
            {backgroundColor: props.backgroundColor},
          ]}>
          <ImageBackground
            style={[styles.innerContainer, {height: headerBarHeight}]}
            source={
              props.cornerShadow
                ? require('../../images/vectors/headerBarBackground.png')
                : undefined
            }
            resizeMode="stretch">
            {props.leftIcons && (
              <View style={[styles.iconsContainer, styles.iconsContainerLeft]}>
                <ListCircleIcons data={props.leftIcons} size="small" />
              </View>
            )}
            <View style={[props.contentStyle, styles.content]}>
              {props.children}
            </View>
            {props.rightIcons && (
              <View style={[styles.iconsContainer, styles.iconsContainerRight]}>
                <ListCircleIcons data={props.rightIcons} size="small" />
              </View>
            )}
          </ImageBackground>
          {props.showShadow && (
            <Image
              style={styles.shadow}
              source={require('../../images/vectors/bottomShadow.png')}
              resizeMode="stretch"
            />
          )}
        </View>
      )}
    </>
  );
};

NewHeaderBar.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  contentStyle: PropTypes.object,
  cornerShadow: PropTypes.bool,
  leftIcons: PropTypes.array,
  onlyStatusBar: PropTypes.bool,
  rightIcons: PropTypes.array,
  showShadow: PropTypes.bool,
  statusBarProps: PropTypes.object,
};

NewHeaderBar.defaultProps = {
  backgroundColor: 'transparent',
  cornerShadow: false,
  onlyStatusBar: false,
  showShadow: false,
  statusBarProps: {},
};

const styles = createStyle(theme => ({
  container: {
    position: 'relative',
    width: '100%',
    zIndex: 110,
    elevation: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing(2),
  },
  iconsContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.spacing(sizes.small),
  },
  iconsContainerLeft: {
    marginRight: theme.spacing(1),
  },
  iconsContainerRight: {
    marginLeft: theme.spacing(1),
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing(1),
  },
  shadow: {
    position: 'absolute',
    width: '100%',
    height: theme.spacing(0.75),
    left: 0,
    right: 0,
    bottom: theme.spacing(-0.75),
    zIndex: 111,
  },
}));
