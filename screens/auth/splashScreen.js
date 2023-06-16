import { SafeAreaView, Image, Dimensions } from "react-native";
import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import { Colors } from "../../constants/style";

const SplashScreen = (props) => {

  const checkNavigation = async () => {
    let navigateValue = "onboardingScreen";
    
    try {
      // await AsyncStorage.removeItem('userDetails')
      let userData = await AsyncStorage.getItem('userDetails')
      if (!userData) {
        navigateValue = "onboardingScreen";
      } else {
        userData = JSON.parse(userData)
        if (userData.mobile && userData.name && userData.email && userData.prefLanguage) {
          navigateValue = "bottomTab";
        } else {
          navigateValue = "onboardingScreen";
        }
      }

    } catch (e) {
      console.log("Error in splashScreen:", e)
    }

    return props.navigation.push(navigateValue);
  }

  setTimeout(() => {
    checkNavigation();
    // return props.navigation.push('verificationScreen');
  }, 2000);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image style={{ width: screenWidth, height: screenHeight }} source={require("../../assets/splash1.jpg")} />
      {/* <Image style={{ width: screenWidth, height: screenHeight }} source={require("../../assets/splash.png")} /> */}
    </SafeAreaView>
  );
};

export default SplashScreen;
