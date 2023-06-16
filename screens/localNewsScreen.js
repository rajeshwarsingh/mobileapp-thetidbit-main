import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { getNewsApi } from '../api/index';

// THIS SCREEN GIVE HEALTH NEWS

const LocalNewsScreen = (props) => {
  const [localNews, setLocalNews] = useState([])

  const backAction = () => {
    props.navigation.goBack();
    return true;
  };

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`localNewsScreen:${key}`);
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    getNewsApi({ prefNews: "Health", newsType: "single" }).then((response) => {
      setLocalNews(response?.data);
    });
  }, [i18n.language]);

  const _handlePressButtonAsync = async (e, item) => {
    let result = await WebBrowser.openBrowserAsync(item.sourceLink);
  };

  const renderItemLocalNews = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        {item.video ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoDetailScreen")}
            style={{
              marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
              marginBottom: Default.fixPadding * 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Image source={item.image} />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: 0,
                  top: 0,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={item.logo} />
              </View>
            </View>
            <View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginTop: Default.fixPadding * 0.5,
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                {item.description}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.primary}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.primary}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text
                  style={{
                    ...Fonts.Medium14Grey,
                  }}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={(e) => _handlePressButtonAsync(e, item)}
            style={{
              marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
              marginBottom: Default.fixPadding * 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 375, height: 186 }} />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={{ uri: item.logo ? item.logo : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 131, height: 148 }} />
              </View>
            </View>
            <View>
              <Text
                style={{
                  ...Fonts.Medium16Black,
                  marginTop: Default.fixPadding * 0.5,
                  textAlign: isRtl ? "right" : "left",
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.primary}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.primary}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text
                  style={{
                    ...Fonts.Medium14Grey,
                  }}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
        <Text style={Fonts.Bold18Black}>Health</Text>
      </View>

      <FlatList
        style={{ backgroundColor: Colors.white }}
        data={localNews}
        renderItem={renderItemLocalNews}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LocalNewsScreen;
