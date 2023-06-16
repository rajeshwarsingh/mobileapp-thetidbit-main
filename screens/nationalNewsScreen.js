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

// THIS SCREEN GIVE Entertainment NEWS

const NationalNewsScreen = (props) => {
  const [nationalNews, setNationalNews] = useState([])
  const backAction = () => {
    props.navigation.navigate("homeScreen");
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
    return t(`nationalNewsScreen:${key}`);
  }

  useEffect(() => {
    getNewsApi({prefNews:"Entertainment", newsType:"single"}).then((response) => {
      setNationalNews(response?.data);
    });
  }, [i18n.language]);

  const _handlePressButtonAsync = async (e,item) => {
    let result = await WebBrowser.openBrowserAsync(item.sourceLink);
  };



  // const nationalNews = [
  //   {
  //     key: "1",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
  //     image: require("../assets/image/image3.png"),
  //     logo: require("../assets/image/icon.png"),
  //     time: "5 min ago",
  //     video: false,
  //   },
  //   {
  //     key: "2",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
  //     image: require("../assets/image/image2.png"),
  //     logo: require("../assets/image/icon2.png"),
  //     time: "15 min ago",
  //     video: true,
  //   },
  //   {
  //     key: "3",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
  //     image: require("../assets/image/image1.png"),
  //     logo: require("../assets/image/icon3.png"),
  //     time: "10 min ago",
  //     video: false,
  //   },
  //   {
  //     key: "4",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
  //     image: require("../assets/image/image4.png"),
  //     logo: require("../assets/image/icon.png"),
  //     time: "20 min ago",
  //     video: false,
  //   },
  //   {
  //     key: "5",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
  //     image: require("../assets/image/image5.png"),
  //     logo: require("../assets/image/icon2.png"),
  //     time: "25 min ago",
  //     video: false,
  //   },
  //   {
  //     key: "6",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
  //     image: require("../assets/image/image6.png"),
  //     logo: require("../assets/image/icon3.png"),
  //     time: "25 min ago",
  //     video: false,
  //   },
  // ];
  const renderItemNationalNews = ({ item, index }) => {
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
            onPress={(e)=>_handlePressButtonAsync(e,item)}
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
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
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
        <Text style={Fonts.Bold18Black}>{tr("nationalNews")}</Text>
      </View>

      <FlatList
        style={{ backgroundColor: Colors.white }}
        data={nationalNews}
        renderItem={renderItemNationalNews}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default NationalNewsScreen;
