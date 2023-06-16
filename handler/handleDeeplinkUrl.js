import OneSignal from 'react-native-onesignal';
import * as WebBrowser from 'expo-web-browser';
import Constants from "expo-constants";
import * as Linking from 'expo-linking';

//DO NOT REMOVE FROM HERE, NEED TO NOUTE ON PERTICULAR SCREEN
import NavigationService from "../services/NavigationService"

const _handlePressButtonAsync = async (url) => {
  await WebBrowser.openBrowserAsync(url);
};


export function handleDeeplinkUrl() {

  const handleDeepLink = (e) => {
    let data = Linking.parse(e.url)

    let newsUrl = data?.queryParams?.newsInx || "";
    _handlePressButtonAsync(newsUrl);

  }

  Linking.addEventListener('url', handleDeepLink)
}

