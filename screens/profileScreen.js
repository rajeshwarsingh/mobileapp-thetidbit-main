import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import Stars from "react-native-stars";
import * as Linking from "expo-linking";
import { getUserProfile } from '../utils/index';

const { width } = Dimensions.get("window");

const ProfileScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`profileScreen:${key}`);
  }
  const [visible, setVisible] = useState(false);
  const [star, setStar] = useState(false);
  
  // GET USER PROFILE INFORMATION FROM LOCAL STORAGE
  const [userProfile, setUserProfile] = useState('')

  useEffect(()=>{
    fetchUserProfile();
  },[])

  const fetchUserProfile = async()=>{
    let profileData = await getUserProfile();
    setUserProfile(profileData);
  }
    // ----GET USER PROFILE INFORMATION END----

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
          {tr("profile")}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            marginTop: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
          }}
        >
          <Image source={require("../assets/image/profileDp.png")} />
          <View
            style={{
              justifyContent: "center",
              marginHorizontal: Default.fixPadding,
              alignItems: isRtl ? "flex-end" : "flex-start",
            }}
          >
            <Text style={{ ...Fonts.Bold16Black }}>{userProfile?.name}</Text>
            <Text style={{ ...Fonts.Medium16Grey }}>{userProfile?.mobile}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("editProfileScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flex: 9.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <Ionicons name="person-outline" size={22} color={Colors.primary} />
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("editProfile")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.primary}
            style={{
              flex: 0.5,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate("channelScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flex: 9.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <Feather name="tv" size={22} color={Colors.primary} />
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("channels")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.primary}
            style={{
              flex: 0.5,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate("bookmarkScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flex: 9.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="bookmark-outline"
              size={22}
              color={Colors.primary}
            />
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("bookmark")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.primary}
            style={{
              flex: 0.5,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => props.navigation.navigate("settingScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flex: 9.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="settings-outline"
              size={22}
              color={Colors.primary}
            />
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("settings")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.primary}
            style={{
              flex: 0.5,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("termsConditionScreen")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flex: 9.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <Foundation
              name="clipboard-notes"
              size={22}
              color={Colors.primary}
            />
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("termsCondition")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.primary}
            style={{
              flex: 0.5,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL("http://play.google.com/store/apps/details?id=com.mobileappthetidbit")}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            borderBottomColor: Colors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flex: 9.5,
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <AntDesign name="staro" size={22} color={Colors.primary} />
            <Text
              style={{
                ...Fonts.Medium16Primary,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("rate")}
            </Text>
          </View>

          <Ionicons
            name={isRtl ? "chevron-back" : "chevron-forward-outline"}
            size={20}
            color={Colors.primary}
            style={{
              flex: 0.5,
              marginHorizontal: Default.fixPadding * 1.5,
            }}
          />
        </TouchableOpacity>

        <Modal animationType="fade" transparent={true} visible={star}>
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
                width: width / 1.3,
                backgroundColor: "white",
                borderRadius: 10,
                ...Default.shadow,
              }}
            >
              <TouchableOpacity
                onPress={() => setStar(false)}
                style={{
                  justifyContent: "flex-end",
                  alignSelf: "flex-end",
                  padding: Default.fixPadding * 0.5,
                }}
              >
                <Ionicons name="close" size={24} color={Colors.grey} />
              </TouchableOpacity>
              <Text style={{ ...Fonts.Bold18Black, textAlign: "center" }}>
                {tr("rateUs")}
              </Text>
              <Text
                style={{
                  ...Fonts.SemiBold14Grey,
                  textAlign: "center",
                  marginHorizontal: Default.fixPadding * 2,
                  marginTop: Default.fixPadding,
                  marginBottom: Default.fixPadding * 2,
                }}
              >
                {tr("rateDescription")}
              </Text>

              <Stars
                default={4}
                count={5}
                starSize={50}
                spacing={10}
                fullStar={
                  <Ionicons name={"star"} size={40} color={Colors.yellow} />
                }
                emptyStar={
                  <Ionicons name={"star"} size={40} color={Colors.lightGrey} />
                }
              />

              <TouchableOpacity
                onPress={() => setStar(false)}
                style={{
                  backgroundColor: Colors.primary,
                  borderRadius: 10,
                  marginHorizontal: Default.fixPadding * 2,
                  paddingVertical: Default.fixPadding * 1.5,
                  marginVertical: Default.fixPadding * 2,
                }}
              >
                <Text
                  style={{ ...Fonts.ExtraBold18White, textAlign: "center" }}
                >
                  {tr("send")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            paddingVertical: Default.fixPadding * 2.5,
          }}
        >
          <View
            style={{
              flexDirection: isRtl ? "row-reverse" : "row",
              marginHorizontal: Default.fixPadding * 1.5,
              alignItems: "center",
            }}
          >
            <AntDesign name="logout" size={22} color={Colors.extraLightRed} />
            <Text
              style={{
                ...Fonts.Medium16ExtraLightRed,
                marginHorizontal: Default.fixPadding,
              }}
            >
              {tr("logout")}
            </Text>
          </View>
        </TouchableOpacity>

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
                width: width / 1.3,
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: Default.fixPadding * 1.5,
                ...Default.shadow,
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold16Black,
                  textAlign: "center",
                  marginTop: Default.fixPadding * 1.5,
                }}
              >
                {tr("areYouLogout")}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  paddingVertical: Default.fixPadding * 1.5,
                }}
              >
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Text
                    style={{
                      ...Fonts.SemiBold18Grey,
                      marginHorizontal: Default.fixPadding * 2,
                    }}
                  >
                    {tr("cancel")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("loginScreen");
                    setVisible(false);
                  }}
                >
                  <Text
                    style={{
                      ...Fonts.SemiBold18Primary,
                      marginRight: Default.fixPadding,
                    }}
                  >
                    {tr("logout")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
