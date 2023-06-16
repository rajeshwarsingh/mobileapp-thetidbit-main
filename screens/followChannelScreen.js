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

const FollowChannelScreen = (props) => {
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
    return t(`followChannelScreen:${key}`);
  }

  const newsChannel = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
      image: require("../assets/image/image2.png"),
      time: "5 min ago",
      video: false,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
      image: require("../assets/image/live4.png"),
      time: "15 min ago",
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
      image: require("../assets/image/live1.png"),
      time: "10 min ago",
      video: true,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
      image: require("../assets/image/image3.png"),
      time: "20 min ago",
      video: false,
    },
    {
      key: "5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
      image: require("../assets/image/live2.png"),
      time: "25 min ago",
      video: true,
    },
    {
      key: "6",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui dignissim eget",
      image: require("../assets/image/live3.png"),
      time: "25 min ago",
      video: false,
    },
  ];
  const renderItemNewsChannel = ({ item, index }) => {
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
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
              marginBottom: Default.fixPadding * 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Image source={item.image} />
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
        )}
      </View>
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
        <Text style={Fonts.Bold18Black}>CNBC {tr("channel")}</Text>
      </View>

      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          marginVertical: Default.fixPadding,
        }}
      >
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Colors.lightSky,
              borderRadius: 10,
              padding: Default.fixPadding,
            }}
          >
            <Image source={require("../assets/image/channel1.png")} />
          </View>
          <Text
            style={{
              ...Fonts.SemiBold16Black,
              marginTop: Default.fixPadding * 0.5,
            }}
          >
            CNBC
          </Text>
        </View>
        <View
          style={{
            flex: 7,
            justifyContent: "center",
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
        >
          <Text style={{ ...Fonts.SemiBold16Black }}>CNBC NEWS CHANNEL</Text>
          <Text style={{ ...Fonts.SemiBold14Grey }}>
            1.2 m {tr("followers")}
          </Text>
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
            }}
          >
            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.primary,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding,
                marginRight: isRtl ? 0 : Default.fixPadding,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14White,
                  paddingHorizontal: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding * 0.8,
                }}
              >
                {tr("follow")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("liveTvScreen")}
              style={{
                ...Default.shadow,
                backgroundColor: Colors.extraLightRed,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding,
                marginRight: isRtl ? Default.fixPadding : 0,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14White,
                  paddingHorizontal: Default.fixPadding * 3,
                  paddingVertical: Default.fixPadding * 0.8,
                }}
              >
                {tr("live")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        style={{ backgroundColor: Colors.white }}
        data={newsChannel}
        renderItem={renderItemNewsChannel}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default FollowChannelScreen;
