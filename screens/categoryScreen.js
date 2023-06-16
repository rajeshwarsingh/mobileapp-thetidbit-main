import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";

const { height, width } = Dimensions.get("window");

const CategoryScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`categoryScreen:${key}`);
  }

  const [news, setNews] = useState(false);
  const [sports, setSports] = useState(false);
  const [finance, setFinance] = useState(false);
  const [heath, setHeath] = useState(false);
  const [education, setEducation] = useState(false);
  const [regional, setRegional] = useState(false);
  const [other, setOther] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View
        style={{
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.white,
        }}
      >
        <Text
          style={{
            ...Fonts.Bold18Black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("categories")}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => {
            setNews((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginTop: Default.fixPadding * 1.5,
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("news")}
            </Text>
            <Ionicons
              name={news ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {news && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("localNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("nationalNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("worldNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("politics")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("allNews")}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}

        <TouchableOpacity
          onPress={() => {
            setSports((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("sports")}
            </Text>

            <Ionicons
              name={sports ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {sports && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("cricket")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>
                  {tr("basketball")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("tennis")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("golf")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("running")}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>
                  {tr("volleyball")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("boxing")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("swimming")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("football")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("sportScreen")}
              >
                <Text style={{ ...Fonts.Bold16Primary }}>{tr("all")}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}

        <TouchableOpacity
          onPress={() => {
            setFinance((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("finance")}
            </Text>

            <Ionicons
              name={finance ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {finance && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("personal")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text
                style={{
                  ...Fonts.Bold16Primary,
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                {tr("covid")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("business")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("stockMarket")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("smallBusiness")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("savings")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("all")}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}

        <TouchableOpacity
          onPress={() => {
            setEducation((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("education")}
            </Text>

            <Ionicons
              name={education ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {education && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("localNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("nationalNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("worldNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("allNews")}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}

        <TouchableOpacity
          onPress={() => {
            setHeath((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("heath")}
            </Text>

            <Ionicons
              name={heath ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {heath && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("localNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("nationalNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("worldNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("allNews")}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}

        <TouchableOpacity
          onPress={() => {
            setRegional((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("regionalNews")}
            </Text>

            <Ionicons
              name={regional ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {regional && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("localNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("nationalNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("worldNews")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("allNews")}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}

        <TouchableOpacity
          onPress={() => {
            setOther((preState) => !preState);
          }}
        >
          <ImageBackground
            source={require("../assets/image/back1.png")}
            style={{
              ...styles.firstImage,
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <Text
              style={{
                ...Fonts.Bold20Primary,
              }}
            >
              {tr("other")}
            </Text>
            <Ionicons
              name={other ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors.primary}
            />
          </ImageBackground>
        </TouchableOpacity>
        {other && (
          <ImageBackground
            source={require("../assets/image/back2.png")}
            style={{
              ...styles.secondImage,
            }}
          >
            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("bollywoodNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("lifestyle")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("food")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("horoscope")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{ marginBottom: Default.fixPadding }}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>
                {tr("entertainment")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
            >
              <Text style={{ ...Fonts.Bold16Primary }}>{tr("all")}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryScreen;
const styles = StyleSheet.create({
  firstImage: {
    height: height / 8,
    width: width / 1.1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Default.fixPadding * 1.5,
  },
  secondImage: {
    borderRadius: 10,
    borderWidth: 2,
    width: width / 1.1,
    borderColor: Colors.primary,
    marginHorizontal: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 1.5,
    padding: Default.fixPadding,
    overflow: "hidden",
    alignSelf: "center",
  },
});
