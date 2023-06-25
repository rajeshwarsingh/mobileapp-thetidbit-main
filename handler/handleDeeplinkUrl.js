import OneSignal from 'react-native-onesignal';
import * as WebBrowser from 'expo-web-browser';
import Constants from "expo-constants";
import * as Linking from 'expo-linking';

//DO NOT REMOVE FROM HERE, NEED TO NOUTE ON PERTICULAR SCREEN
import NavigationService from "../services/NavigationService"

const _handlePressButtonAsync = async (url,title) => {
  // title = title.replace(/:$/, '');
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",title.substr(title.length-2,1))
  setTimeout(()=>{

    if(title.substr(title.length-1,1)){
      title = title.substr(0,title.length-1);
    };

    return NavigationService.navigate('videoScreen',{notiOrShareCliecked:true,title, url})
  },1000)
  // await WebBrowser.openBrowserAsync(url);
};

export async function handleDeeplinkUrl() {

  console.log("******************************************************handleDeeplinkUrl")

  const handleDeepLink = (e) => {
    let data = Linking.parse(e.url)
    console.log("######################################route1 :",data);
    let url = data?.queryParams?.newsInx || "";
    let title = data?.queryParams?.newsInxShow || "";
    _handlePressButtonAsync(url,title);
    

  }

  const url = await Linking.getInitialURL();
  const route = Linking.parse(url);
  console.log("######################################route :",route);
  if(route?.queryParams?.newsInx && route?.queryParams?.newsInxShow){
    _handlePressButtonAsync(route?.queryParams?.newsInx, route?.queryParams?.newsInxShow)
  }
 
  Linking.addEventListener('url', handleDeepLink)
}

