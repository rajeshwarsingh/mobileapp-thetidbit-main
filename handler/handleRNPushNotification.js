// import 'react-native-get-random-values';
import OneSignal from 'react-native-onesignal';
import * as WebBrowser from 'expo-web-browser';
import Constants from "expo-constants";
import { useEffect } from "react";
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {updateUser} from './api/index';


PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};


export async function handleOSPushNotification() {
   // Assume a message-notification contains a "type" property in the data payload of the screen to open
   const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });

    // Save the device token
    messaging()
    .getToken()
    .then(token => {
      alert(token);
      updateUser({mobile:"+918983712448","expoToken":token})
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@fcm device token:",token);

      // return saveTokenToDatabase(token);
    });
}

