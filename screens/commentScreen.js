import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  FlatList,
  TextInput,
  BackHandler,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";

const CommentScreen = (props) => {
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
    return t(`commentScreen:${key}`);
  }

  const comment = [
    {
      key: "1",
      name: "Guest User",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit Amet minim mollit non",
      image: require("../assets/image/profile1.png"),
      date: "19 July 2022",
    },
    {
      key: "2",
      name: "Guest User",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit Amet minim mollit non",
      image: require("../assets/image/profile2.png"),
      date: "19 July 2022",
    },
    {
      key: "3",
      name: "Guest User",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit Amet minim mollit non",
      image: require("../assets/image/profile3.png"),
      date: "19 July 2022",
    },
    {
      key: "4",
      name: "Guest User",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit Amet minim mollit non",
      image: require("../assets/image/profile4.png"),
      date: "19 July 2022",
    },
    {
      key: "5",
      name: "Guest User",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit Amet minim mollit non",
      image: require("../assets/image/profile5.png"),
      date: "19 July 2022",
    },
    {
      key: "6",
      name: "Guest User",
      description:
        "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Velit Amet minim mollit non",
      image: require("../assets/image/profile6.png"),
      date: "19 July 2022",
    },
  ];
  const renderItemComment = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View
        style={{
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <Image source={item.image} />
          <View
            style={{
              justifyContent: "center",
              marginHorizontal: Default.fixPadding,
            }}
          >
            <Text style={{ ...Fonts.Regular16Black }}>{item.name}</Text>
            <Text style={{ ...Fonts.Medium12ExtraLightGrey }}>{item.date}</Text>
          </View>
        </View>
        <Text
          style={{
            ...Fonts.Medium14ExtraLightGrey,
            marginTop: Default.fixPadding,
          }}
        >
          {item.description}
        </Text>
      </View>
    );
  };
  const [text, onChangeText] = useState();

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
        <Text style={{ ...Fonts.Bold18Black }}>{tr("comment")}</Text>
      </View>
      <FlatList
        style={{ backgroundColor: Colors.white }}
        data={comment}
        renderItem={renderItemComment}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={{
          ...Default.shadow,
          flexDirection: isRtl ? "row-reverse" : "row",
          alignItems: "center",
          backgroundColor: Colors.white,
          paddingVertical: Default.fixPadding,
        }}
      >
        <TextInput
          style={{
            ...Fonts.Medium16Black,
            flex: 8.5,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding * 1.5,
          }}
          selectionColor={Colors.primary}
          placeholder={tr("writeComment")}
          placeholderTextColor={Colors.grey}
          onChangeText={(value) => {
            onChangeText(value);
          }}
          value={text}
        />

        <View style={{ flex: 1.5 }}>
          <View
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: Colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="send-outline" size={18} color={Colors.white} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommentScreen;
