import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";

const SearchScreen = (props) => {
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
    return t(`searchScreen:${key}`);
  }
  const [search, setSearch] = useState();
  const [clearAll, setClearAll] = useState();
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
          paddingVertical: Default.fixPadding * 1.5,
          backgroundColor: Colors.white,
          flexDirection: isRtl ? "row-reverse" : "row",
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
        <Text style={{ ...Fonts.Bold18Black }}>{tr("search")}</Text>
      </View>

      <View
        style={{
          ...Default.shadow,
          flexDirection: isRtl ? "row-reverse" : "row",
          backgroundColor: Colors.white,
          borderRadius: 10,
          padding: Default.fixPadding * 0.5,
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
        }}
      >
        <Ionicons
          name="search-outline"
          color={Colors.grey}
          size={22}
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignSelf: "center",
            marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
            marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
          }}
        />
        <TextInput
          style={{
            ...Fonts.SemiBold16Black,
            flex: 9.4,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding,
            paddingVertical: Default.fixPadding * 0.5,
          }}
          onChangeText={(text) => setSearch(text)}
          value={search}
          selectionColor={Colors.primary}
          placeholder={tr("search")}
          placeholderTextColor={Colors.grey}
          autoFocus={true}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {clearAll ? null : (
          <View>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                justifyContent: "space-between",
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
              }}
            >
              <Text style={{ ...Fonts.Bold16Black }}>{tr("recentSearch")}</Text>
              <TouchableOpacity
                onPress={() => setClearAll((preState) => !preState)}
              >
                <Text style={{ ...Fonts.SemiBold14Grey }}>
                  {tr("clearAll")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                alignItems: "center",
              }}
            >
              <Ionicons name="time-outline" size={18} color={Colors.grey} />
              <Text
                style={{
                  ...Fonts.SemiBold16Grey,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                {tr("breakingNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                alignItems: "center",
              }}
            >
              <Ionicons name="time-outline" size={18} color={Colors.grey} />
              <Text
                style={{
                  ...Fonts.SemiBold16Grey,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                {tr("sportNews")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                alignItems: "center",
              }}
            >
              <Ionicons name="time-outline" size={18} color={Colors.grey} />
              <Text
                style={{
                  ...Fonts.SemiBold16Grey,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                {tr("channel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("localNewsScreen")}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                alignItems: "center",
              }}
            >
              <Ionicons name="time-outline" size={18} color={Colors.grey} />
              <Text
                style={{
                  ...Fonts.SemiBold16Grey,
                  marginHorizontal: Default.fixPadding * 0.5,
                }}
              >
                {tr("trendingNews")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Text
          style={{
            ...Fonts.SemiBold18Black,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
        >
          {tr("categories")}
        </Text>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setNews((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("news")}
            </Text>

            <Ionicons
              name={news ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {news && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("localNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("nationalNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("worldNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("politics")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("allNews")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setSports((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("sports")}
            </Text>

            <Ionicons
              name={sports ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {sports && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("cricket")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("basketball")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("tennis")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("golf")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("running")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("volleyball")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("boxing")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("swimming")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("localNewsScreen")}
                  style={{ marginBottom: Default.fixPadding }}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("football")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => props.navigation.navigate("sportScreen")}
                >
                  <Text style={{ ...Fonts.SemiBold14Primary }}>
                    {tr("all")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setFinance((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("finance")}
            </Text>

            <Ionicons
              name={finance ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {finance && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("personal")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text
                  style={{
                    ...Fonts.SemiBold14Primary,
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
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("business")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("stockMarket")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("smallBusiness")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("savings")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>{tr("all")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setHeath((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("heath")}
            </Text>

            <Ionicons
              name={heath ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {heath && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("localNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("nationalNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("worldNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("allNews")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setEducation((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("education")}
            </Text>

            <Ionicons
              name={education ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {education && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("localNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("nationalNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("worldNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("allNews")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setRegional((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("regionalNews")}
            </Text>

            <Ionicons
              name={regional ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {regional && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("localNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("nationalNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("worldNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("allNews")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...Default.shadow,
            backgroundColor: Colors.white,
            borderRadius: 10,
            padding: Default.fixPadding,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
          }}
          onPress={() => {
            setOther((preState) => !preState);
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("other")}
            </Text>

            <Ionicons
              name={other ? "chevron-up-outline" : "chevron-down-outline"}
              size={22}
              color={Colors.primary}
            />
          </View>

          {other && (
            <View
              style={{
                marginHorizontal: Default.fixPadding * 1.5,
                marginBottom: Default.fixPadding * 1.5,
                marginTop: Default.fixPadding,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("bollywoodNews")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("lifestyle")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>{tr("food")}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("horoscope")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
                style={{ marginBottom: Default.fixPadding }}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>
                  {tr("entertainment")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("localNewsScreen")}
              >
                <Text style={{ ...Fonts.SemiBold14Primary }}>{tr("all")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
