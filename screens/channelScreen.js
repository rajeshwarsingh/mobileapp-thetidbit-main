import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";
import { Colors, Fonts, Default } from "../constants/style";
import { useTranslation } from "react-i18next";

const ChannelScreen = (props) => {
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
    return t(`channelScreen:${key}`);
  }

  const breakingNews = [
    {
      key: "1",
      name: "CNBC",
      image: require("../assets/image/channel1.png"),
      title: "Follow",
      follow: true,
    },
    {
      key: "2",
      name: "Vice",
      image: require("../assets/image/channel2.png"),
      title: "Follow",
      follow: true,
    },
    {
      key: "3",
      name: "Vox",
      image: require("../assets/image/channel3.png"),
      title: "Following",
      follow: false,
    },
    {
      key: "4",
      name: "BBC News",
      image: require("../assets/image/channel4.png"),
      title: "Following",
      follow: false,
    },
    {
      key: "5",
      name: "SCMP",
      image: require("../assets/image/channel5.png"),
      title: "Follow",
      follow: true,
    },
    {
      key: "6",
      name: "CNN",
      image: require("../assets/image/channel6.png"),
      title: "Follow",
      follow: true,
    },
    {
      key: "7",
      name: "TIME",
      image: require("../assets/image/channel7.png"),
      title: "Follow",
      follow: true,
    },
    {
      key: "8",
      name: "Buzzfeed",
      image: require("../assets/image/channel8.png"),
      title: "Following",
      follow: false,
    },
    {
      key: "9",
      name: "Daily Mail",
      image: require("../assets/image/channel9.png"),
      title: "Follow",
      follow: true,
    },
    {
      key: "10",
      name: "TIME",
      image: require("../assets/image/channel10.png"),
      title: "Following",
      follow: false,
    },
    {
      key: "11",
      name: "Buzzfeed",
      image: require("../assets/image/channel11.png"),
      title: "Following",
      follow: false,
    },
    {
      key: "12",
      name: "Following",
      image: require("../assets/image/channel12.png"),
      title: "Follow",
      follow: true,
    },
  ];
  const renderItemBreakingNews = ({ item, index }) => {
    const isEnd =
      index === breakingNews.length - 1 ||
      index === breakingNews.length - 2 ||
      index === breakingNews.length - 3;

    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("followChannelScreen")}
        style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          borderRadius: 10,
          marginRight: Default.fixPadding,
          marginHorizontal: index % 3 === 0 ? Default.fixPadding : 0,
          marginTop: Default.fixPadding,
          marginBottom: isEnd ? Default.fixPadding : 0,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: Default.fixPadding,
            backgroundColor: Colors.lightSky,
            borderRadius: 10,
            padding: Default.fixPadding,
          }}
        >
          <Image source={item.image} />
        </View>
        <Text
          style={{
            ...Fonts.Medium16Black,
            marginVertical: Default.fixPadding * 0.3,
          }}
        >
          {item.name}
        </Text>
        {item.follow ? (
          <View
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 10,
              marginBottom: Default.fixPadding,
            }}
          >
            <Text
              style={{
                ...Fonts.SemiBold14White,
                paddingHorizontal: Default.fixPadding * 2.8,
                paddingVertical: Default.fixPadding,
              }}
            >
              {item.title}
            </Text>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 10,
              marginBottom: Default.fixPadding,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          >
            <Text
              style={{
                ...Fonts.SemiBold14Primary,
                paddingHorizontal: Default.fixPadding * 1.5,
                paddingVertical: Default.fixPadding,
              }}
            >
              {item.title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

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
        <Text style={Fonts.Bold18Black}>{tr("channels")}</Text>
      </View>

      <Text
        style={{
          ...Fonts.Bold16Black,
          marginHorizontal: Default.fixPadding * 1.5,
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        {tr("followChannel")}
      </Text>

      <FlatList
        numColumns={3}
        data={breakingNews}
        renderItem={renderItemBreakingNews}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ChannelScreen;
