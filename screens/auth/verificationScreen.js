import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-root-toast";
import { Colors, Fonts, Default } from "../../constants/style";
import Loader from "../../components/loader";

// ------------Firebase OTP Verification---------
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
// ------------Firebase OTP end Verification---------

const { height, width } = Dimensions.get("window");

const VerificationScreen = (props) => {
  const { mobile="",source } = props?.route?.params || {};
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [visible, setVisible] = useState(false);

  function tr(key) {
    return t(`verificationScreen:${key}`);
  }
  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // alert('user verified');
      // props.navigation.navigate("languageScreen");
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setVisible(true)
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setVisible(false)
    setConfirm(confirmation);
    Toast.show('OTP sent successfully', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  async function confirmCode() {
    try {
      setVisible(true);
      let data = await confirm.confirm(code);
      setTimeout(() => {
        setVisible(false);
        if(source==='login'){
          return props.navigation.navigate("bottomTab",{mobile});
        }
        return props.navigation.navigate("languageScreen",{mobile});
      }, 1500);
    } catch (error) {
      console.log('Invalid code.');
      setVisible(false);
      Toast.show('Invalid OTP, Please enter again.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }

  const handleRegister = () => {
    confirmCode();
  };

  const handleOtpChange = (code) => {
    setCode(code);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View
        style={{
          backgroundColor: Colors.primary,
          height: height / 7,
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={27}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/image/newsTop.png")}
          style={{ alignSelf: "center" }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        <Text
          style={{
            ...Fonts.Bold25Primary,
            marginVertical: Default.fixPadding,
          }}
        >
          {tr("verification")}
        </Text>
        <Text
          style={{
            ...Fonts.Medium14Grey,
            textAlign: "center",
          }}
        >
          {tr("confirmation")}
        </Text>
        <Text
          style={{
            ...Fonts.Medium14Grey,
            textAlign: "center",
          }}
        >
          {tr("mobileNo")} {mobile}
        </Text>
        <OTPTextView
          containerStyle={{
            marginVertical: Default.fixPadding,
            marginHorizontal: Default.fixPadding,
          }}
          textInputStyle={{
            backgroundColor: Colors.white,
            borderRadius: 10,
            marginHorizontal: Default.fixPadding,
            ...Fonts.Medium22White,
            ...Default.shadow,
            marginVertical: Default.fixPadding,
            selectionColor: Colors.primary,
          }}
          tintColor={Colors.transparent}
          offTintColor={Colors.transparent}
          inputCount={6}
          keyboardType="numeric"
          handleTextChange={handleOtpChange}
        />
        <Loader visible={visible} />

        <TouchableOpacity
          onPress={handleRegister}
          style={{
            ...Default.shadow,
            width: width / 1.1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.primary,
            marginTop: Default.fixPadding * 3,
            paddingVertical: Default.fixPadding * 1.5,
            borderRadius: 10,
          }}
        >
          <Text style={{ ...Fonts.ExtraBold18White }}>{tr("verifyNow")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signInWithPhoneNumber(mobile)}
        >
          <Text
            style={{ ...Fonts.SemiBold16Primary, marginTop: Default.fixPadding }}
          >
            {tr("resend")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationScreen;
