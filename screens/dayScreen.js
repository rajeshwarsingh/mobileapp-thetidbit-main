import {
  Text,
  View,
  SafeAreaView,
  BackHandler,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Ionicons from "react-native-vector-icons/Ionicons";

const DayScreen = (props) => {
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const { i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  const dayOptions = [
    {
      id: "1",
      day: "Mon 29",
      status: "31°26°",
      other: "4%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
    {
      id: "2",
      day: "Tue 30",
      status: "28°26°",
      other: "5%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
    {
      id: "3",
      day: "Wed 31",
      status: "25°26°",
      other: "3%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
    {
      id: "4",
      day: "Thu 01",
      status: "22°00°",
      other: "4%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
    {
      id: "5",
      day: "Fri 02",
      status: "25°26°",
      other: "2%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
    {
      id: "6",
      day: "Sat 03",
      status: "31°26°",
      other: "4%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
    {
      id: "7",
      day: "Sun 04",
      status: "30°26°",
      other: "1%",
      img: require("../assets/image/sunIcon.png"),
      icon: "water",
    },
  ];

  const renderItemDay = ({ item }) => {
    return (
      <View
        style={{
          borderBottomColor: Colors.lightGrey,
          borderBottomWidth: 1.5,
          paddingVertical: Default.fixPadding * 2,
          paddingHorizontal: Default.fixPadding * 2,
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...Fonts.SemiBold16Black }}>{item.day}</Text>
        <Image source={item.img} />
        <Text style={{ ...Fonts.SemiBold14Black }}>{item.status}</Text>
        <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
          <Ionicons name={item.icon} size={17} color={Colors.darkGreen} />
          <Text style={{ ...Fonts.SemiBold14Black }}>{item.other}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <FlatList
        data={dayOptions}
        renderItem={renderItemDay}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default DayScreen;
