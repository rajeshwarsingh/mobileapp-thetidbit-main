import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  StatusBar,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { BottomSheet } from "react-native-btr";
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserProfile } from '../utils/index';
import { saveUser } from '../api/index';

const { width } = Dimensions.get("window");

const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.transparent,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: Default.fixPadding,
              }}
              onPress={() => {
                props.setModalVisible();
                props.toggleClose();
              }}
            >
              <Ionicons name="close" color={Colors.white} size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync();
                  props.setPickedImage(photo);
                  props.setModalVisible();
                  props.toggleClose();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: Colors.white,
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: Colors.white,
                    height: 40,
                    width: 40,
                    backgroundColor: Colors.white,
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: Default.fixPadding,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons
                name="camera-reverse-outline"
                color={Colors.white}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};
export default function EditProfileScreen(props) {
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
    return t(`editProfileScreen:${key}`);
  }
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [mobile, onChangeMobile] = useState("1258392334");
  const [name, onChangeName] = useState("Guest User");
  const [email, onChangeEmail] = useState("Guest User@gmail.com");

  const [visible, setVisible] = useState(false);

  // GET USER PROFILE INFORMATION FROM LOCAL STORAGE
  const [userProfile, setUserProfile] = useState('')

  useEffect(()=>{
    fetchUserProfile();
  },[])

  const fetchUserProfile = async()=>{
    let profileData = await getUserProfile();
    setUserProfile(profileData);
    let Mobile = profileData?.mobile.substr(3,profileData?.mobile?.length)
    onChangeMobile(Mobile);
    onChangeName(profileData?.name);
    onChangeEmail(profileData?.email);
  }
    // ----GET USER PROFILE INFORMATION END----


  const toggleClose = () => {
    setVisible(!visible);
  };

  const toastRemoveImage = () => {
    Toast.show(tr("removeImage"), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    toggleClose();
  };

  const [pickedImage, setPickedImage] = useState();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      toggleClose();
      setPickedImage(result.uri);
    }
  };

  const [removeImage, setRemoveImage] = useState(false);

  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleUpdate = async() => {
    if (!name) {
      alert('Please enter your name.');
      return;
    }

    if (!mobile) {
      alert('Please enter your mobile number.');
      return;
    }

    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
      alert('Invalid name. Only alphabets and spaces are allowed.');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert('Invalid mobile number. It should be a 10-digit number.');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert('Invalid email address.');
      return;
    }
    try{
      await saveUser({ name, mobile:`+91${mobile}`, email });
      await AsyncStorage.setItem('userDetails', JSON.stringify({ name,  mobile: `+91${mobile}`, email }));
      setVisibleUpdate(true);
    }catch(e){
      console.log("profile edit error:", e)
      alert('Unable to edit profile, Try again later!')
    }
    
  }

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
        <Text style={Fonts.Bold18Black}>{tr("editProfile")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggleClose}
          onBackdropPress={toggleClose}
        >
          <View style={styles.bottomSheetMain}>
            <Text
              style={{
                ...Fonts.SemiBold18Black,
                marginHorizontal: Default.fixPadding * 2,
                marginVertical: Default.fixPadding,
              }}
            >
              {tr("changeProfile")}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setShowCamera(true);
              }}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
                backgroundColor: Colors.white,
              }}
            >
              <View
                style={{
                  ...Default.shadow,
                  height: 45,
                  width: 45,
                  borderRadius: 45 / 2,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="camera" size={24} color={Colors.blue} />
              </View>
              <Text
                style={{
                  ...Fonts.SemiBold16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("camera")}
              </Text>
            </TouchableOpacity>
            {camera && (
              <CameraModule
                showModal={camera}
                setModalVisible={() => setShowCamera(false)}
                setPickedImage={(result) => setPickedImage(result.uri)}
                toggleClose={() => toggleClose()}
              />
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImage}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="image" size={24} color={Colors.green} />
              </View>
              <Text
                style={{
                  ...Fonts.SemiBold16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("gallery")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                toastRemoveImage();
                setRemoveImage(true);
                setPickedImage(null);
              }}
              style={{
                flexDirection: isRtl ? "row-reverse" : "row",
                paddingVertical: Default.fixPadding,
                alignItems: "center",
                marginHorizontal: Default.fixPadding * 2,
              }}
            >
              <View style={[Default.shadow, styles.round]}>
                <Ionicons name="trash" size={24} color={Colors.red} />
              </View>
              <Text
                style={{
                  ...Fonts.SemiBold16Black,
                  marginHorizontal: Default.fixPadding,
                }}
              >
                {tr("remove")}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {!pickedImage ? (
            <View>
              {removeImage ? (
                <View
                  style={{
                    height: 140,
                    width: 140,
                    borderRadius: 80,
                    backgroundColor: Colors.lightGrey,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person" size={45} color={Colors.black} />
                </View>
              ) : (
                <Image
                  source={require("../assets/image/profileDp.png")}
                  style={{ height: 140, width: 140 }}
                />
              )}
            </View>
          ) : (
            <Image
              style={{
                alignSelf: "center",
                height: 140,
                width: 140,
                borderRadius: 80,
              }}
              source={{ uri: pickedImage }}
            />
          )}
          {/* <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: Colors.white,
              borderWidth: 2,
              borderColor: Colors.primary,
              borderRadius: 10,
              paddingVertical: Default.fixPadding * 0.7,
              paddingHorizontal: Default.fixPadding * 1.5,
            }}
          >
            <Text style={{ ...Fonts.SemiBold16Primary }}>
              {tr("changeImage")}
            </Text>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            marginTop: Default.fixPadding * 3,
            marginBottom: Default.fixPadding * 1.5,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="person-outline"
            color={Colors.grey}
            size={20}
            style={{
              flex: 0.7,
            }}
          />
          <TextInput
            placeholder={tr("enterName")}
            placeholderTextColor={Colors.grey}
            onChangeText={onChangeName}
            selectionColor={Colors.primary}
            value={name}
            style={{
              ...Fonts.SemiBold16Grey,
              flex: 9.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>

        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="mail-outline"
            color={Colors.grey}
            size={20}
            style={{
              flex: 0.7,
            }}
          />
          <TextInput
            placeholder={tr("enterEmail")}
            placeholderTextColor={Colors.grey}
            onChangeText={onChangeEmail}
            selectionColor={Colors.primary}
            keyboardType="email-address"
            value={email}
            style={{
              ...Fonts.SemiBold16Grey,
              flex: 9.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>

        <View
          style={{
            ...Default.shadow,
            borderRadius: 10,
            backgroundColor: Colors.white,
            padding: Default.fixPadding * 1.5,
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding * 1.5,
            flexDirection: isRtl ? "row-reverse" : "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="call-outline"
            color={Colors.grey}
            size={20}
            style={{
              flex: 0.7,
            }}
          />
          <TextInput
            placeholder={tr("enterMobile")}
            placeholderTextColor={Colors.grey}
            onChangeText={onChangeMobile}
            selectionColor={Colors.primary}
            keyboardType="number-pad"
            value={mobile}
            maxLength={10}
            style={{
              ...Fonts.SemiBold16Grey,
              flex: 9.3,
              textAlign: isRtl ? "right" : "left",
              marginHorizontal: Default.fixPadding * 0.5,
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleUpdate}
        style={{
          ...Default.shadow,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.primary,
          margin: Default.fixPadding * 1.5,
          paddingVertical: Default.fixPadding * 1.5,
          borderRadius: 10,
        }}
      >
        <Text style={{ ...Fonts.ExtraBold18White }}>{tr("update")}</Text>
      </TouchableOpacity>
      <Modal animationType="fade" transparent={true} visible={visibleUpdate}>
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
              width: width / 1.5,
              backgroundColor: Colors.white,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              ...Default.shadow,
              paddingVertical: Default.fixPadding * 1.5,
            }}
          >
            <Text
              style={{
                ...Fonts.SemiBold16Black,
              }}
            >
              {tr("successfully")}
            </Text>

            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginHorizontal: Default.fixPadding,
              }}
              onPress={() => {
                setVisibleUpdate(false);
                props.navigation.navigate("profileScreen");
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold18Primary,
                  marginHorizontal: Default.fixPadding * 1.5,
                  marginTop: Default.fixPadding,
                }}
              >
                {tr("ok")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheetMain: {
    backgroundColor: Colors.white,
    paddingVertical: Default.fixPadding,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  round: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
