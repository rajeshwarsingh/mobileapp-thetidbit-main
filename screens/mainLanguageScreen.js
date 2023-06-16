import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../components/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {updateUser} from '../api/index'
import {getUserProfile} from '../utils/index'
const MainLanguageScreen = (props) => {
  const [visible, setVisible] = useState(false);

  const backAction = () => {
    props.navigation.navigate("settingScreen");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState(
    i18n.resolvedLanguage
  );

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`mainLanguageScreen:${key}`);
  }

  async function onChangeLang(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem("@APP:languageCode", lang);
    } catch (error) {
      alert("something went wrong");
    }
  }

  const onDisableHandler = i18n.language === selectedLanguage;

  function languageOpt({ name, lang }) {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedLanguage(lang);
        }}
        style={{
          backgroundColor: Colors.white,
          ...Default.shadow,
          borderRadius: 8,
          alignItems: "center",
          paddingVertical: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            ...Fonts.SemiBold18Black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {name}
        </Text>
        <MaterialCommunityIcons
          name={selectedLanguage === lang ? "circle-slice-8" : "circle-outline"}
          size={24}
          color={selectedLanguage === lang ? Colors.primary : Colors.grey}
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
        />
      </TouchableOpacity>
    );
  }
  const getLangFullName = (name)=>{
    let lang = {
      "en":"english",
      "hi":"hindi",
      "mr":"marathi"
    }
    return lang[name]?lang[name]:'english';
  }
  const updateAndReset = async () => {
    let profile = await getUserProfile();
    let profMoile = profile.mobile.substr(0,1)!=="+"?`+91${profile.mobile}`:profile.mobile
      let reqBody = { mobile:profMoile, prefLanguage: getLangFullName(selectedLanguage) };
      await updateUser(reqBody);
      let userData = await AsyncStorage.getItem('userDetails');
      userData = JSON.parse(userData)
      userData.prefLanguage = getLangFullName(selectedLanguage);
      await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
    
  }

  const handleUpdate = async () => {
    setVisible(true);
    try {
      await updateAndReset();
      setTimeout(() => {
        setVisible(false);
        onChangeLang(selectedLanguage);
        props.navigation.navigate("profileScreen");
      }, 1500);
    } catch (e) {
      setVisible(false);
      alert('Unable to udate, Please try again later!')
      console.log('Error in language update :', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View
        style={{
          paddingVertical: Default.fixPadding * 1.5,
          backgroundColor: Colors.white,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Text style={Fonts.Bold18Black}>{tr("language")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          {languageOpt({ name: "English", lang: "en" })}
          {languageOpt({ name: "हिन्दी", lang: "hi" })}
          {languageOpt({ name: "मराठी", lang: "mr" })}
          {/* {languageOpt({ name: "中国人", lang: "ch" })} */}
          {/* {languageOpt({ name: "عربي", lang: "ar" })} */}
        </View>
      </ScrollView>
      <Loader visible={visible} />
      <TouchableOpacity
        onPress={handleUpdate}
        disabled={onDisableHandler}
        style={[onDisableHandler ? styles.disableStyle : styles.enableStyle]}
      >
        <Text
          style={{
            ...Fonts.ExtraBold18White,
          }}
        >
          {tr("update")}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainLanguageScreen;

const styles = StyleSheet.create({
  disableStyle: {
    ...Default.shadow,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.grey,
    marginHorizontal: Default.fixPadding * 1.5,
    marginVertical: Default.fixPadding * 1.5,
    paddingVertical: Default.fixPadding * 1.5,
    borderRadius: 10,
  },
  enableStyle: {
    ...Default.shadow,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    marginHorizontal: Default.fixPadding * 1.5,
    marginVertical: Default.fixPadding * 1.5,
    paddingVertical: Default.fixPadding * 1.5,
    borderRadius: 10,
  },
});
