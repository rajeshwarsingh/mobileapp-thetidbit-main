import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { SwipeListView } from "react-native-swipe-list-view";
import Toast from "react-native-root-toast";

const NotificationScreen = (props) => {
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
    return t(`notificationScreen:${key}`);
  }

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
  const notificationList =[];
  
  // const notificationList = [
  //   {
  //     key: "1",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "2",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "3",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "4",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "5",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "6",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "7",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  //   {
  //     key: "8",
  //     img: require("../assets/image/notification.png"),
  //     title: tr("breakingNews"),
  //     description: tr("punjabAlert"),
  //     status: tr("minAgo"),
  //   },
  // ];

  const rowTranslateAnimatedValues = {};
  notificationList.forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

  const [listData, setListData] = useState(
    notificationList.map((NotificationItem, i) => ({
      key: `${i}`,
      image: NotificationItem.img,
      title: NotificationItem.title,
      description: NotificationItem.description,
      status: NotificationItem.status,
    }))
  );

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -Dimensions.get("window").width) {
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        toastRemove();
      });
    }
  };

  const renderItem = (data) => {
    return (
      <Animated.View
        style={{
          ...Default.shadow,
          backgroundColor: Colors.lightBlack,
          paddingHorizontal: Default.fixPadding * 1.5,
          backgroundColor: Colors.white,
          flexDirection: isRtl ? "row-reverse" : "row",
          borderBottomColor: Colors.grey,
          borderBottomWidth: 1,
          alignItems: "center",
          ...{
            height: rowTranslateAnimatedValues[data.item.key].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        }}
      >
        <Image source={data.item.image} />
        <View
          style={{
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text
            style={{
              ...Fonts.SemiBold16Primary,
            }}
          >
            {data.item.title}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold16Black,
              marginVertical: Default.fixPadding * 0.2,
            }}
          >
            {data.item.description}
          </Text>
          <Text
            style={{
              ...Fonts.SemiBold14Grey,
            }}
          >
            {data.item.status}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderHiddenItem = () => (
    <View style={{ backgroundColor: Colors.extraLightRed, flex: 1 }}></View>
  );

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
        <Text style={{ ...Fonts.Bold18Black }}>{tr("notification")}</Text>
      </View>

      {listData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons
            name="notifications-outline"
            size={48}
            color={Colors.grey}
          />
          <Text style={{ ...Fonts.Medium16Grey }}>{tr("noNotification")}</Text>
        </View>
      ) : (
        <SwipeListView
          disableRightSwipe
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get("window").width}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
