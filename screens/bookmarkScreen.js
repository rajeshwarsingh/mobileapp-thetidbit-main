import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StatusBar,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Toast from "react-native-root-toast";
import { SwipeListView } from "react-native-swipe-list-view";

const BookmarkScreen = (props) => {
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
    return t(`bookmarkScreen:${key}`);
  }

  const dataList = [
    {
      key: "1",
      image: require("../assets/image/bookmark1.png"),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui ",
      description: "5 Aug 2022 ",
      video: true,
    },
    {
      key: "2",
      image: require("../assets/image/bookmark2.png"),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui ",
      description: "5 Aug 2022 ",
      video: true,
    },
    {
      key: "3",
      image: require("../assets/image/bookmark3.png"),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui ",
      description: "5 Aug 2022 ",
      video: true,
    },
    {
      key: "4",
      image: require("../assets/image/bookmark4.png"),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui ",
      description: "5 Aug 2022 ",
      video: false,
    },
    {
      key: "5",
      image: require("../assets/image/bookmark5.png"),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui ",
      description: "5 Aug 2022 ",
      video: false,
    },
    {
      key: "6",
      image: require("../assets/image/bookmark6.png"),
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscin elit.justo nunc ornare dui ",
      description: "5 Aug 2022 ",
      video: false,
    },
  ];

  const [listData, setListData] = useState(
    dataList.map((favoriteItem, index) => ({
      key: `${index}`,
      title: favoriteItem.title,
      image: favoriteItem.image,
      description: favoriteItem.description,
      video: favoriteItem.video,
    }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = (data) => {
    return (
      <View>
        {data.item.video ? (
          <View
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              overflow: "hidden",
              borderRadius: 10,
              marginHorizontal: Default.fixPadding * 2,
              marginVertical: Default.fixPadding,
            }}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <Image source={data.item.image} />

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
                  marginHorizontal: Default.fixPadding,
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  style={{
                    ...Fonts.Medium14Black,
                    maxWidth: "80%",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {data.item.title}
                </Text>

                <Text style={{ ...Fonts.Medium14ExtraLightGrey }}>
                  {data.item.description}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              ...Default.shadow,
              backgroundColor: Colors.white,
              overflow: "hidden",
              borderRadius: 10,
              marginHorizontal: Default.fixPadding * 2,
              marginVertical: Default.fixPadding,
            }}
          >
            <View
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <Image source={data.item.image} />

              <View
                style={{
                  marginHorizontal: Default.fixPadding,
                  justifyContent: "center",
                  alignItems: isRtl ? "flex-end" : "flex-start",
                }}
              >
                <Text
                  style={{
                    ...Fonts.Medium14Black,
                    maxWidth: "80%",
                    textAlign: isRtl ? "right" : "left",
                  }}
                >
                  {data.item.title}
                </Text>

                <Text style={{ ...Fonts.Medium14ExtraLightGrey }}>
                  {data.item.description}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.backRightBtnRight,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          marginHorizontal: 20,
          width: 50,
          height: 90,
          borderRadius: 10,
          marginTop: Default.fixPadding * 1.3,
        }}
        onPress={() => {
          deleteRow(rowMap, data.item.key);
          Toast.show(tr("remove"), {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }}
      >
        <Ionicons name="trash" size={30} color={Colors.white} />
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
        <Text style={Fonts.Bold18Black}>{tr("bookmark")}</Text>
      </View>
      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Octicons name="bookmark-slash" color={Colors.grey} size={40} />
          <Text style={Fonts.SemiBold16Grey}>{tr("empty")}</Text>
        </View>
      ) : (
        <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-80}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  backRightBtnRight: {
    backgroundColor: Colors.extraLightRed,
    right: 0,
  },
});
