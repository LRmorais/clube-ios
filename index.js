import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import NewApp from './v2';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => NewApp);
