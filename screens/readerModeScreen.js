import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  BackHandler,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Loader from "../components/loader";

const ReaderModeScreen = (props) => {
  const backAction = () => {
    props.navigation.navigate("settingScreen");
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
    return t(`readerModeScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);

  const handleMode = () => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate("settingScreen");
    }, 1500);
  };

  const mode = [
    {
      id: "1",
      text: tr("auto"),
    },
    {
      id: "2",
      text: tr("enabled"),
    },
    {
      id: "3",
      text: tr("disabled"),
    },
  ];
  const [selectedMode, setSelectedMode] = useState(tr("auto"));

  const renderItemMode = ({ item, index }) => {
    const isFirst = index === 0;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          ...Default.shadow,
          borderRadius: 8,
          alignItems: "center",
          padding: Default.fixPadding * 1.5,
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginHorizontal: Default.fixPadding * 1.5,
        }}
        onPress={() => {
          setSelectedMode(item.text);
        }}
      >
        <Text style={{ ...Fonts.SemiBold16Black }}>{item.text}</Text>
        <MaterialCommunityIcons
          name={
            selectedMode === item.text ? "circle-slice-8" : "circle-outline"
          }
          size={24}
          color={selectedMode === item.text ? Colors.primary : Colors.grey}
        />
      </TouchableOpacity>
    );
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
        <Text style={Fonts.Bold18Black}>{tr("readerMode")}</Text>
      </View>

      <Loader visible={visible} />
      <FlatList
        data={mode}
        renderItem={renderItemMode}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        onPress={handleMode}
        style={{
          ...Default.shadow,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          marginVertical: Default.fixPadding * 3,
          marginHorizontal: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 10,
        }}
      >
        <Text style={{ ...Fonts.ExtraBold18White }}>{tr("update")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReaderModeScreen;
