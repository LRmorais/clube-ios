import { Platform, ActionSheetIOS, UIManager, findNodeHandle } from 'react-native';

function noop() {}

function showOptionsMenu(options, menuRef) {
  let texts = options.map(([text]) => text);
  let callbacks = options.map(([_, callback]) => callback);
  ({
    ios: showOptionsMenuIOS,
    android: showOptionsMenuAndroid,
  })[Platform.OS](texts, callbacks, menuRef);
}

function showOptionsMenuIOS(options, callbacks, menuRef) {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: [
        ...options,
        'Cancelar',
      ],
      destructiveButtonIndex: options.length,
      cancelButtonIndex: options.length,
    },
    (index) => handlePress(callbacks, index),
  );
}

function showOptionsMenuAndroid(texts, callbacks, menuRef) {
  UIManager.showPopupMenu(
    findNodeHandle(menuRef),
    texts,
    noop,
    (_, index) => handlePress(callbacks, index),
  );
}

function handlePress(callbacks, index) {
  let callback = callbacks[index];
  if (callback) callback();
}

export default showOptionsMenu;
