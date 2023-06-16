import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { Colors, Fonts, Default } from "../../constants/style";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import IntlPhoneInput from "react-native-intl-phone-input";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from "../../components/loader";
import {getUser} from "../../api/index"

const { height } = Dimensions.get("window");

const LoginScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`loginScreen:${key}`);
  }

  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleLogin = async() => {
    if (!mobile) {
      alert('Please enter your mobile number.');
      return;
    }

    // if (!/^\d{10}$/.test(mobile)) {
    //   alert('Invalid mobile number. It should be a 10-digit number.');
    //   return;
    // }
    
    try {
      setVisible(true);
      let userData = await getUser({ mobile:`+91${mobile.trim()}` });
      if(!userData){
        setVisible(false);
        return props.navigation.navigate("registerScreen",{mobile:`+91${mobile.trim()}`, source:'login' });
      }
      await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
      setTimeout(() => {
        setVisible(false);
        
        return props.navigation.navigate("verificationScreen",{mobile:`+91${mobile.trim()}`,source:'login'});
      }, 1500);

    } catch (e) {
      setVisible(false);
      console.log("error in login", e);
      alert('Error in login')
    }

    
  };

  const handlePhoneNumberChange = (phoneNumberData) => {
    setMobile(phoneNumberData.phoneNumber);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View
        style={{
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
          height: height / 7,
        }}
      >
        <Image source={require("../../assets/image/newsTop.png")} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            margin: Default.fixPadding * 1.5,
          }}
        >
          <Text style={{ ...Fonts.Bold25Primary }}>{tr("login")}</Text>
          <Text
            style={{
              ...Fonts.Medium14ExtraLightGrey,
              marginVertical: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
              maxWidth: isRtl ? null : "70%",
            }}
          >
            {tr("pleaseConfirm")}
          </Text>

          <IntlPhoneInput
            placeholder={tr("mobileNo")}
            onChangeText={handlePhoneNumberChange}
            defaultCountry="IN"
            containerStyle={{
              ...Default.shadow,
              ...Fonts.SemiBold16Grey,
              borderRadius: 10,
              backgroundColor: Colors.white,
              marginVertical: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
            phoneInputStyle={{
              borderLeftWidth: 2,
              borderLeftColor: Colors.lightGrey,
              paddingHorizontal: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
            }}
          />

          <Text style={{ ...Fonts.Medium12DarkRed }}>{tr("verification")}</Text>
          <Loader visible={visible} />
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              ...Default.shadow,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary,
              marginVertical: Default.fixPadding * 3,
              paddingVertical: Default.fixPadding * 1.5,
              borderRadius: 10,
            }}
          >
            <Text style={{ ...Fonts.ExtraBold18White }}>{tr("login")}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
