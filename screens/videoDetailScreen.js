import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Share,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import Toast from "react-native-root-toast";

const { width } = Dimensions.get("window");

const VideoDetailScreen = (props) => {
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
    return t(`videoDetailScreen:${key}`);
  }
  const [isVisible, setVisible] = useState(false);

  const shareMessage = () => {
    Share.share({
      message: toString(),
    });
  };

  const toastAdd = () => {
    Toast.show(tr("add"), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };
  const toastRemove = () => {
    Toast.show(tr("remove"), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

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
        <View
          style={{ flex: 1, alignItems: isRtl ? "flex-end" : "flex-start" }}
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
        </View>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "flex-end",
            flex: 1,
            marginHorizontal: Default.fixPadding * 1.5,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginHorizontal: isRtl ? Default.fixPadding : 0 }}
            onPress={() => {
              setVisible((preState) => !preState);
              {
                isVisible ? toastAdd() : toastRemove();
              }
            }}
          >
            <Ionicons
              name={isVisible ? "bookmark-outline" : "bookmark"}
              size={20}
              color={Colors.black}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={shareMessage}
            style={{ marginHorizontal: isRtl ? 0 : Default.fixPadding }}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color={Colors.black}
            />
          </TouchableOpacity>
        </View>
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
            <Image source={require("../assets/image/time.png")} />
            <View
              style={{
                ...Default.shadow,
                backgroundColor: Colors.white,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: Default.fixPadding,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  ...Fonts.SemiBold14Primary,
                  paddingHorizontal: Default.fixPadding * 1.5,
                  paddingVertical: Default.fixPadding * 0.5,
                }}
              >
                {tr("following")}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 7,
              alignItems: "flex-start",
              marginLeft: isRtl ? Default.fixPadding * 1.5 : 0,
            }}
          >
            <Text style={{ ...Fonts.SemiBold18Black }}>
              PM Modi gives a call for“Jai Anusandhan” to promote innovation in
              India during‘Azadi kaAmrit mahotsav’
            </Text>
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
                  marginHorizontal: isRtl ? 0 : Default.fixPadding,
                }}
              >
                <Ionicons
                  name="eye-outline"
                  size={20}
                  color={Colors.grey}
                  style={{
                    marginRight: isRtl ? Default.fixPadding : 0,
                  }}
                />
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

export default VideoDetailScreen;

const styles = StyleSheet.create({
  video: {
    width: width / 1,
    height: 240,
  },
});
