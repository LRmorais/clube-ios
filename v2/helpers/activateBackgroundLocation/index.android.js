import { useState, useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';

export default function activateBackgroundLocation(hasPermission) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let emitter = new NativeEventEmitter(NativeModules.LocationManager);
    let subscription = emitter.addListener(
      NativeModules.LocationManager.JS_LOCATION_EVENT_NAME,
      setLocation
    );
    return () => {
      NativeModules.LocationManager.stopBackgroundLocation();
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (hasPermission) NativeModules.LocationManager.startBackgroundLocation();
    else NativeModules.LocationManager.stopBackgroundLocation();
  }, [hasPermission]);

  return location;
}
