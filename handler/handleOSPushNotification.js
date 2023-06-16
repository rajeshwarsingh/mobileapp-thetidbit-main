// import 'react-native-get-random-values';
import OneSignal from 'react-native-onesignal';
import * as WebBrowser from 'expo-web-browser';
import Constants from "expo-constants";
import { getUserProfile } from "../utils/index"
import { updateUser } from "../api/index"

// import { v4 as uuidv4 } from 'uuid';

//DO NOT REMOVE FROM HERE, NEED TO NOUTE ON PERTICULAR SCREEN
import NavigationService from "../services/NavigationService"

const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};


export async function handleOSPushNotification() {
  let userData = await getUserProfile()

 

  OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);

  OneSignal.setLogLevel(6, 0);

  // SET USERID TO SEND NOTIFICATION TO SPECIFICE USER
  OneSignal.setExternalUserId(userData?.mobile, (results) => {
    // Push can be expected in almost every situation with a success status, but
    // as a pre-caution its good to verify it exists
    if (results.push && results.push.success) {
      console.log('Results of setting external user id push status:');
      console.log(results.push.success);
      console.log("#################################updateUser", { mobile: userData?.mobile, OSExternalUserId: userData?.mobile })
      updateUser({ mobile: userData?.mobile, OSExternalUserId: userData?.mobile });
    }

    // Verify the email is set or check that the results have an email success status
    // if (results.email && results.email.success) {
    //   console.log('Results of setting external user id email status:');
    //   console.log(results.email.success);
    // }

    // Verify the number is set or check that the results have an sms success status
    // if (results.sms && results.sms.success) {
    //   console.log('Results of setting external user id sms status:');
    //   console.log(results.sms.success);
    // }
  });

  // HANDLING PUSH NOTIFICATION ON FORGROUND, WHEN APP IS ALREADY OPEN
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    let notification = notificationReceivedEvent.getNotification();
    const data = notification.additionalData
    //Silence notification by calling complete() with no argument
    notificationReceivedEvent.complete(notification);
  });

  // HANDLING WHEN NOTIFICAITON OPENED
  OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
    const { action, notification } = openedEvent;
    const { url = "" } = notification?.additionalData;
    console.log('url:', url)
    await _handlePressButtonAsync(url);
    // NavigationService.navigate('SCREEN_NAME')
  });
}

