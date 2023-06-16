import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import React, {useEffect, useState} from "react";
import { getBreakingNews } from '../api/index'

const VideoScreen = (props) => {
  const [breakingNews, setBreakingNews] = useState([])
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`videoScreen:${key}`);
  }

  useEffect(() => {
    getBreakingNews().then((response) => {
      setBreakingNews(response?.data);
    });
  }, []);
  
  const _handlePressButtonAsync = async (e,item) => {
    let result = await WebBrowser.openBrowserAsync(item.sourceLink);
  };

  const renderItemBreakingNews = ({ item, index }) => {
    const isFirst = index === 0;
    // alert(item)
    return (
      <TouchableOpacity
        onPress={(e)=>_handlePressButtonAsync(e,item)}
        style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          borderRadius: 10,
          marginHorizontal: Default.fixPadding * 1.5,
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          borderColor: Colors.primary,
          flexDirection: isRtl ? "row-reverse" : "row",
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: item.image ? item.image : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 131, height: 148 }} />
         <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: Colors.white,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            alignSelf: "center",
            marginHorizontal: Default.fixPadding * 5,
          }}
        >
          <Ionicons name="caret-forward" size={20} color={Colors.black} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              maxWidth: "80%",
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {item.description}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14Grey,
              marginVertical: Default.fixPadding * 0.5,
            }}
          >
            {item.time}
          </Text>
          <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
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
        </View>
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
        }}
      >
        <Text
          style={{
            ...Fonts.Bold18Black,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          {tr("video")}
        </Text>
      </View>

      <FlatList
        style={{ backgroundColor: Colors.white }}
        data={breakingNews}
        renderItem={renderItemBreakingNews}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default VideoScreen;
