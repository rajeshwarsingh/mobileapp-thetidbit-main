import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Colors, Fonts, Default } from "../../constants/style";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

const OnboardingScreen = (props) => {
  const { t } = useTranslation();

  function tr(key) {
    return t(`onboardingScreen:${key}`);
  }

  const slides = [
    {
      key: "s1",
      title: tr("title1"),
      subtitle: tr("description1"),
      image: require("../../assets/image/onBoarding1.png"),
      backgroundColor: Colors.white,
    },
    {
      key: "s2",
      title: tr("title2"),
      subtitle: tr("description2"),
      image: require("../../assets/image/onBoarding2.png"),
      backgroundColor: Colors.white,
    },
    {
      key: "s3",
      title: tr("title3"),
      subtitle: tr("description3"),
      image: require("../../assets/image/onBoarding3.png"),
      backgroundColor: Colors.white,
    },
  ];

  const onDone = () => {
    props.navigation.navigate("registerScreen");
  };
  const onSkip = () => {
    props.navigation.navigate("registerScreen");
  };

  const renderNextButton = () => {
    return (
      <View
        style={{
          height: 50,
          borderRadius: 5,
          borderColor: Colors.white,
          borderWidth: 1.5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold18White }}>{tr("next")}</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View
        style={{
          height: 50,
          borderRadius: 5,
          borderColor: Colors.white,
          borderWidth: 1.5,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: Default.fixPadding * 3.4,
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold18White }}>{tr("next")}</Text>
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: Default.fixPadding * 1.5,
        }}
      >
        <Text style={{ ...Fonts.Bold14LightGrey }}>{tr("skip")}</Text>
      </View>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 6, justifyContent: "center" }}>
          <Image source={item.image} />
        </View>
        <View
          style={{
            backgroundColor: Colors.primary,
            flex: 4,
            width: width,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Fonts.Bold25White,
              textAlign: "center",
              marginVertical: Default.fixPadding,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14LightPink,
              textAlign: "center",
              maxWidth: "90%",
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        renderSkipButton={renderSkipButton}
        onDone={onDone}
        showSkipButton={true}
        onSkip={onSkip}
        bottomButton
        dotStyle={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: Colors.lightGrey,
        }}
        activeDotStyle={{
          backgroundColor: Colors.white,
          height: 14,
          width: 14,
          borderRadius: 7,
        }}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
