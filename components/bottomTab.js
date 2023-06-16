import { Dimensions, BackHandler } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";
import HomeScreen from "../screens/homeScreen";
import CategoryScreen from "../screens/categoryScreen";
import VideoScreen from "../screens/videoScreen";
import WeatherScreen from "../screens/weatherScreen";
import ProfileScreen from "../screens/profileScreen";
import { Default, Colors } from "../constants/style";
import { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-root-toast";

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get("window");

const BottomTab = () => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`bottomTab:${key}`);
  }

  const [exitApp, setExitApp] = useState(0);
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000);

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      Toast.show(tr("exitApp"), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        backHandler.remove()
      );
  });

  const title1 = isRtl ? tr("profile") : tr("home");
  const title2 = isRtl ? tr("home") : tr("profile");
  const title3 = isRtl ? tr("weather") : tr("category");
  const title4 = isRtl ? tr("category") : tr("weather");

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.white,
          padding: Default.fixPadding * 0.5,
          height: height / 13,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontFamily: "Bold",
          fontSize: 14,
          paddingBottom: Default.fixPadding * 0.5,
        },
      }}
    >
      <Tab.Screen
        name="videoScreen"
        component={VideoScreen}
        options={{
          title: tr("video"),
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={"newspaper-outline"}
              color={focused ? Colors.primary : Colors.grey}
              size={22}
            />
          ),
        }}
      />

      <Tab.Screen
        name={isRtl ? "profileScreen" : "homeScreen"}
        component={isRtl ? ProfileScreen : HomeScreen}
        options={{
          title: title1,
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={isRtl ? "person-outline" : "home-outline"}
              color={focused ? Colors.primary : Colors.grey}
              size={22}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name={isRtl ? "weatherScreen" : "categoryScreen"}
        component={isRtl ? WeatherScreen : CategoryScreen}
        options={{
          title: title3,
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={isRtl ? "cloud-outline" : "grid-outline"}
              color={focused ? Colors.primary : Colors.grey}
              size={22}
            />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name={isRtl ? "categoryScreen" : "weatherScreen"}
        component={isRtl ? CategoryScreen : WeatherScreen}
        options={{
          title: title4,
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={isRtl ? "grid-outline" : "cloud-outline"}
              color={focused ? Colors.primary : Colors.grey}
              size={22}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name={isRtl ? "homeScreen" : "profileScreen"}
        component={isRtl ? HomeScreen : ProfileScreen}
        options={{
          title: title2,
          tabBarActiveTintColor: Colors.primary,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name={isRtl ? "home-outline" : "person-outline"}
              color={focused ? Colors.primary : Colors.grey}
              size={22}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
