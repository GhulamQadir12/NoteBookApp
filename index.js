/**
 * @format
 */

import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
async function onMessageReceived(remoteMessage) {
  const channelId = await notifee.createChannel({
    id: 'Default',
    importance: AndroidImportance.HIGH,
    name: 'Default Channel',
  });
  notifee.displayNotification({
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    android: {
      channelId: channelId,
    },
    data: remoteMessage?.data,
  });
}
messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
AppRegistry.registerComponent(appName, () => App);
