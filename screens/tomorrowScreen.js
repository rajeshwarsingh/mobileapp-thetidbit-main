import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";

const TodayScreen = (props) => {
  const backAction = () => {
    props.navigation.goBack();
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
    return t(`todayScreen:${key}`);
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: Default.fixPadding * 1.5 }}>
          <Text
            style={{
              ...Fonts.SemiBold16Black,
              textAlign: isRtl ? "right" : "left",
            }}
          >
            Surat {tr("forecast")}
          </Text>
          <View
            style={{
              ...Default.shadow,
              flexDirection: isRtl ? "row-reverse" : "row",
              backgroundColor: Colors.white,
              borderRadius: 10,
              paddingVertical: Default.fixPadding,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>{tr("morning")}</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>28°C</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
                borderRightColor: Colors.lightGrey,
                borderRightWidth: 2,
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>{tr("afternoon")}</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>12°C</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>{tr("evening")}</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>10°C</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: Default.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.SemiBold16Black }}>
            {tr("hourlyForecast")}
          </Text>
          <View
            style={{
              ...Default.shadow,
              flexDirection: isRtl ? "row-reverse" : "row",
              backgroundColor: Colors.white,
              borderRadius: 10,
              paddingVertical: Default.fixPadding,
              marginVertical: Default.fixPadding * 1.5,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>{tr("now")}</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>28°C</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
                borderRightColor: Colors.lightGrey,
                borderRightWidth: 2,
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>18:30</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>12°C</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>19:30</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>10°C</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderLeftWidth: 2,
                borderLeftColor: Colors.lightGrey,
                borderRightColor: Colors.lightGrey,
                borderRightWidth: 2,
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>20.30</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>10°C</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ ...Fonts.Medium16Black }}>21.30</Text>
              <Image
                source={require("../assets/image/barishIcon.png")}
                style={{ marginVertical: Default.fixPadding }}
              />
              <Text style={{ ...Fonts.SemiBold14Black }}>10°C</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodayScreen;
