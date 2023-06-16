import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";

const TermsConditionScreen = (props) => {
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
    return t(`termsConditionScreen:${key}`);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View
        style={{
          paddingVertical: Default.fixPadding,
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
        <Text style={Fonts.Bold18Black}>{tr("termsCondition")}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: Default.fixPadding * 1.5 }}>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionMain")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionSub")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionMain")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionSub")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionSub")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionSub")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
              marginBottom: Default.fixPadding,
            }}
          >
            {tr("descriptionMain")}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
            }}
          >
            {tr("descriptionMain")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsConditionScreen;
