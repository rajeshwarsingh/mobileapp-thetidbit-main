import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodayScreen from "./todayScreen";
import TomorrowScreen from "./tomorrowScreen";
import DayScreen from "./dayScreen";
import { Colors, Default, Fonts } from "../constants/style";
import { useTranslation } from "react-i18next";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";

const Tab = createMaterialTopTabNavigator();

const { height, width } = Dimensions.get("window");

function MyTabBar({ state, descriptors, navigation }) {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`weatherScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);

  const cityOptions = [
    {
      id: "1",
      text: "Surat",
    },
    {
      id: "2",
      text: "Mumbai",
    },
    {
      id: "3",
      text: "Delhi",
    },
    {
      id: "4",
      text: "Hyderabad",
    },
    {
      id: "5",
      text: "Pune",
    },
    {
      id: "6",
      text: "Jaipur",
    },
    {
      id: "7",
      text: "Ahmadabad",
    },
    {
      id: "8",
      text: "Kochi",
    },
    {
      id: "9",
      text: "Jaipur",
    },
    {
      id: "10",
      text: "Nagpur",
    },
    {
      id: "11",
      text: "Vadodara",
    },
    {
      id: "12",
      text: "Rajkot",
    },
    {
      id: "13",
      text: "Agra",
    },
    {
      id: "14",
      text: "Rajasthan",
    },
    {
      id: "15",
      text: "Bangalore",
    },
    {
      id: "16",
      text: "Solapur",
    },
  ];
  const [selectedCity, setSelectedCity] = useState("Surat");

  return (
    <View style={{ backgroundColor: Colors.white }}>
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginHorizontal: Default.fixPadding * 1.5,
          marginVertical: Default.fixPadding,
        }}
      >
        <Text style={{ ...Fonts.Bold18Black }}>{tr("weather")}</Text>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{ flexDirection: isRtl ? "row-reverse" : "row" }}
        >
          <Ionicons name="location-outline" size={20} color={Colors.primary} />
          <Text style={{ ...Fonts.SemiBold16Primary }}>{selectedCity}</Text>
          <Ionicons name="chevron-down" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../assets/image/weather.png")}
        style={{ justifyContent: "center", alignSelf: "center" }}
      />

      <Text
        style={{
          ...Fonts.SemiBold20Grey,
          textAlign: "center",
          marginVertical: Default.fixPadding,
        }}
      >
        {tr("forecast")}
      </Text>

      <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                borderBottomColor: isFocused
                  ? Colors.primary
                  : Colors.lightGrey,
                borderBottomWidth: 2,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: Default.fixPadding,
              }}
            >
              <Text
                style={
                  isFocused ? Fonts.SemiBold16Primary : Fonts.SemiBold16Grey
                }
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal animationType="fade" transparent={true} visible={visible}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.white,
              width: width / 1.3,
              height: height / 1.2,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                ...Fonts.SemiBold18Black,
                textAlign: "center",
                marginVertical: Default.fixPadding,
              }}
            >
              {tr("selectCity")}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {cityOptions.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      alignItems: "center",
                      marginHorizontal: Default.fixPadding * 3,
                      marginBottom: Default.fixPadding * 1.5,
                      flexDirection: isRtl ? "row-reverse" : "row",
                    }}
                    onPress={() => {
                      setSelectedCity(item.text);
                      setVisible(false);
                    }}
                  >
                    <Ionicons
                      name={
                        selectedCity === item.text
                          ? "radio-button-on-outline"
                          : "ellipse-outline"
                      }
                      size={30}
                      color={Colors.primary}
                    />

                    <View style={{ marginHorizontal: Default.fixPadding }}>
                      <Text style={{ ...Fonts.SemiBold16Black }}>
                        {item.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const TopTabDetails = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";

  function tr(key) {
    return t(`weatherScreen:${key}`);
  }
  const title = isRtl ? tr("day") : tr("today");
  const title2 = isRtl ? tr("today") : tr("day");

  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          textTransform: "capitalize",
        },
        tabBarActiveTintColor: Colors.primary,
        inactiveColor: Colors.grey,

        tabBarIndicatorStyle: {
          borderBottomColor: Colors.primary,
          borderBottomWidth: 3,
        },
      }}
    >
      <Tab.Screen
        name={isRtl ? "dayScreen" : "todayScreen"}
        component={isRtl ? DayScreen : TodayScreen}
        options={{
          title: title,
        }}
      />
      <Tab.Screen
        name="tomorrowScreen"
        component={TomorrowScreen}
        options={{
          title: tr("tomorrow"),
        }}
      />
      <Tab.Screen
        name={isRtl ? "todayScreen" : "dayScreen"}
        component={isRtl ? TodayScreen : DayScreen}
        options={{
          title: title2,
        }}
      />
    </Tab.Navigator>
  );
};
export default TopTabDetails;
