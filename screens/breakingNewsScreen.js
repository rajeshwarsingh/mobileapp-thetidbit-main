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
import { getNewsApi } from '../api/index'

const BreakingNewsScreen = (props) => {
  const [breakingNews, setBreakingNews] = useState([])
  const backAction = () => {
    props.navigation.navigate("homeScreen");
    return true;
  };

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`breakingNewsScreen:${key}`);
  }
  
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  useEffect(() => {
    getNewsApi({prefNews:"General", newsType:"single"}).then((response) => {
      setBreakingNews(response?.data);
    });
  }, [i18n.language]);
  
  const renderItemBreakingNews = ({ item, index }) => {
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
              flex: 1,
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
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  {item.time}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            // onPress={() => props.navigation.navigate("newsDetailScreen")}
            onPress={(e)=>_handlePressButtonAsync(e,item)}
            style={{
              marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
              marginBottom: Default.fixPadding * 2,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
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
                    marginHorizontal: Default.fixPadding * 0.5,
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

  const _handlePressButtonAsync = async (e,item) => {
    let result = await WebBrowser.openBrowserAsync(item.sourceLink);
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
        <Text style={Fonts.Bold18Black}>{tr("breakingNews")}</Text>
      </View>

      <FlatList
        data={breakingNews}
        renderItem={renderItemBreakingNews}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default BreakingNewsScreen;
