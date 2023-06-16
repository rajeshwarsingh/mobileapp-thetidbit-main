import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  BackHandler,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import ToggleSwitch from "toggle-switch-react-native";

const SettingScreen = (props) => {
  const backAction = () => {
    props.navigation.navigate("profileScreen");
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`settingScreen:${key}`);
  }

  const [notification, setNotification] = useState(true);
  const switchNotification = () =>
    setNotification((previousState) => !previousState);
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
        <Text style={Fonts.Bold18Black}>{tr("settings")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            paddingVertical: Default.fixPadding * 2,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 8.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("pushNotification")}
          </Text>

          <ToggleSwitch
            style={{
              flex: 1.7,
              marginHorizontal: isRtl ? Default.fixPadding : 0,
            }}
            isOn={notification}
            onColor={Colors.primary}
            offColor={Colors.lightGrey}
            size="medium"
            onToggle={switchNotification}
          />
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("mainLanguageScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            paddingVertical: Default.fixPadding * 2,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 9,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("language")}
          </Text>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward"}
            color={Colors.grey}
            size={20}
            style={{
              flex: 1,
              marginHorizontal: isRtl ? Default.fixPadding : 0,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("favouriteScreen",{setting:true})}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            paddingVertical: Default.fixPadding * 2,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 9,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            Preferred news
            {/* {tr("selectFavourite")} */}
          </Text>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward"}
            color={Colors.grey}
            size={20}
            style={{
              flex: 1,
              marginHorizontal: isRtl ? Default.fixPadding : 0,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("readerModeScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding * 2,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              flex: 9,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          >
            {tr("readerMode")}
          </Text>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward"}
            color={Colors.grey}
            size={20}
            style={{
              flex: 1,
              marginHorizontal: isRtl ? Default.fixPadding : 0,
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
