import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import React, { useEffect } from "react";
import { Video } from "expo-av";

const { width } = Dimensions.get("window");

const LiveTvScreen = (props) => {
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
    return t(`liveTvScreen:${key}`);
  }

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const detailData = [
    {
      key: "1",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.",
    },
    {
      key: "2",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae ",
    },
    {
      key: "3",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.",
    },
    {
      key: "4",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae ",
    },
    {
      key: "5",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae ",
    },
    {
      key: "6",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae ",
    },
    {
      key: "7",
      name: "Possimus ipsa ea. Dolorum ea vel et sit voluptatem quis ex. Sequi iusto velit ratione voluptas repudiandae aliquid molestiae non. Et enim quam. Et consequatur sunt dicta esse eveniet tempore deserunt.",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View
        style={{
          paddingVertical: Default.fixPadding,
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
        <Text style={{ ...Fonts.Bold18Black }}>{tr("channel")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Video
          ref={video}
          style={styles.video}
          source={require("../assets/video/SampleVideo.mp4")}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginVertical: Default.fixPadding * 1.5,
          }}
        >
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={require("../assets/image/live.png")} />
          </View>
          <View
            style={{ flex: 7, alignItems: isRtl ? "flex-end" : "flex-start" }}
          >
            <Text style={{ ...Fonts.SemiBold16Black }}>{tr("channel")}</Text>
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                marginTop: Default.fixPadding * 0.5,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("commentScreen")}
                style={{ flexDirection: isRtl ? "row-reverse" : "row" }}
              >
                <Ionicons
                  name="chatbox-outline"
                  size={20}
                  color={Colors.grey}
                />
                <Text
                  style={{
                    ...Fonts.Medium14Grey,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  500
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  marginHorizontal: Default.fixPadding,
                }}
              >
                <Ionicons name="eye-outline" size={20} color={Colors.grey} />
                <Text
                  style={{
                    ...Fonts.Medium14Grey,
                    marginHorizontal: Default.fixPadding * 0.5,
                  }}
                >
                  1.5k
                </Text>
              </View>
            </View>
            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.extraLightRed,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding * 0.5,
                width: width / 4,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold18White,
                  paddingHorizontal: Default.fixPadding * 1.5,
                  paddingVertical: Default.fixPadding * 0.5,
                }}
              >
                {tr("live")}
              </Text>
            </View>
          </View>
        </View>

        {detailData.map((item) => {
          return (
            <View
              key={item.key}
              style={{
                marginBottom: Default.fixPadding,
                marginHorizontal: Default.fixPadding * 1.5,
              }}
            >
              <Text style={{ ...Fonts.Regular14Grey }}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveTvScreen;

const styles = StyleSheet.create({
  video: {
    width: width / 1,
    height: 240,
  },
});
