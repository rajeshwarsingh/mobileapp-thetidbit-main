import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  TextInput,
  Alert,
  Button,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Default } from "../../constants/style";
import { useTranslation } from "react-i18next";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from "../../components/loader";
import { saveUser } from '../../api/index';
const { height } = Dimensions.get("window");

const RegisterScreen = (props) => {
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`registerScreen:${key}`);
  }

  const [mobile, onChangeMobile] = useState();
  const [name, onChangeName] = useState();
  const [email, onChangeEmail] = useState();
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [visible, setVisible] = useState(false);

  const handleRegister = async() => {
    if (!name) {
      setAlertMessage('Please enter your name.');
      setAlertVisible(true);
      return;
    }

    if (!mobile) {
      setAlertMessage('Please enter your mobile number.');
      setAlertVisible(true);
      return;
    }

    if (!email) {
      setAlertMessage('Please enter your email address.');
      setAlertVisible(true);
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
      setAlertMessage('Invalid name. Only alphabets and spaces are allowed.');
      setAlertVisible(true);
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setAlertMessage('Invalid mobile number. It should be a 10-digit number.');
      setAlertVisible(true);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setAlertMessage('Invalid email address.');
      setAlertVisible(true);
      return;
    }
    setVisible(true);
    try {
      let user = await saveUser({ name, mobile:`+91${mobile}`, email });
      // CHECK USER ALREADY EXIST
      if(user.message === "User already exists"){
        await AsyncStorage.setItem('userDetails', JSON.stringify(user.data));
      }else{
        await AsyncStorage.setItem('userDetails', JSON.stringify({ name,  mobile: `+91${mobile}`, email }));
      }
      
      setTimeout(() => {
        setVisible(false);
        return props.navigation.navigate("languageScreen", { mobile: `+91${mobile}` });
      }, 1500);

    } catch (e) {
      // LOG THE ERROR HERE
      console.log("Error in handleRegister :",e)
    }

  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <View
        style={{
          backgroundColor: Colors.primary,
          height: height / 7,
        }}
      >
        <TouchableOpacity
          style={{
            marginHorizontal: Default.fixPadding * 1.5,
            alignItems: isRtl ? "flex-end" : "flex-start",
          }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={27}
            color={Colors.white}
          />
        </TouchableOpacity>
        <Image
          source={require("../../assets/image/newsTop.png")}
          style={{ alignSelf: "center" }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: Default.fixPadding * 1.5 }}>
          <Text style={{ ...Fonts.Bold25Primary }}>{tr("register")}</Text>
          <Text
            style={{
              ...Fonts.Medium14ExtraLightGrey,
              marginVertical: Default.fixPadding,
              textAlign: isRtl ? "right" : "left",
              maxWidth: isRtl ? null : "70%",
            }}
          >
            {tr("pleaseCreate")}
          </Text>

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              marginTop: Default.fixPadding * 2,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={tr("name")}
              placeholderTextColor={Colors.grey}
              onChangeText={onChangeName}
              selectionColor={Colors.primary}
              value={name}
              style={{
                ...Fonts.SemiBold16Black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            />
            <Ionicons
              name="person-outline"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
          </View>

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              marginTop: Default.fixPadding * 2,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={tr("email")}
              placeholderTextColor={Colors.grey}
              onChangeText={onChangeEmail}
              selectionColor={Colors.primary}
              keyboardType="email-address"
              value={email}
              style={{
                ...Fonts.SemiBold16Black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            />
            <Ionicons
              name="mail-outline"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
          </View>

          <View
            style={{
              ...Default.shadow,
              borderRadius: 10,
              backgroundColor: Colors.white,
              padding: Default.fixPadding * 1.5,
              marginTop: Default.fixPadding * 2,
              flexDirection: isRtl ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder={tr("mobile")}
              placeholderTextColor={Colors.grey}
              onChangeText={onChangeMobile}
              selectionColor={Colors.primary}
              keyboardType="number-pad"
              value={mobile}
              maxLength={10}
              style={{
                ...Fonts.SemiBold16Black,
                flex: 9.3,
                textAlign: isRtl ? "right" : "left",
                marginHorizontal: Default.fixPadding * 0.5,
              }}
            />
            <Ionicons
              name="call-outline"
              color={Colors.grey}
              size={20}
              style={{
                flex: 0.7,
              }}
            />
          </View>
          <Loader visible={visible} />

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              ...Default.shadow,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.primary,
              marginVertical: Default.fixPadding * 3,
              paddingVertical: Default.fixPadding * 1.5,
              borderRadius: 10,
            }}
          >
            <Text style={{ ...Fonts.ExtraBold18White }}>{tr("register")}</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isAlertVisible} onBackdropPress={handleAlertClose}>
        <View style={{ backgroundColor: 'white', padding: 16 }}>
          <Text>{alertMessage}</Text>
          <Button
            title="OK"
            // width='20px'
            width='400'
            onPress={handleAlertClose}
            color="red" // Set the color of the button
            style={{height:100, marginTop: 8, width: 20}} // Adjust the margin
          />
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
