import {
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from 'react-native-modal';
import { Colors, Fonts, Default } from "../../constants/style";
import Loader from "../../components/loader";

const { height } = Dimensions.get("window");

const LanguageScreen = (props) => {
  const { mobile='' } = props.route.params;
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`languageScreen:${key}`);
  }
  const language = [
    {
      id: "1",
      text: tr("english"),
    },
    {
      id: "2",
      text: tr("hindi"),
    },
    {
      id: "3",
      text: tr("marathi"),
    }
  ];
  const [selectedLanguage, setSelectedLanguage] = useState(tr("english"));
  const [visible, setVisible] = useState(false);

  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleLanguage = async (language) => {

    if (!selectedLanguage) {
      setAlertMessage('Please enter your prefered language.');
      setAlertVisible(true);
      return;
    }

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      props.navigation.navigate("favouriteScreen", { mobile, prefLanguage: language });
    }, 1000);
  };

  const renderItemLanguage = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.white,
          ...Default.shadow,
          borderRadius: 8,
          alignItems: "center",
          padding: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 1.5,
          flexDirection: isRtl ? "row-reverse" : "row",
          justifyContent: "space-between",
          marginHorizontal: Default.fixPadding * 1.5,
        }}
        onPress={() => {
          handleLanguage(item.text);
        }}
      >
        <Text style={{ ...Fonts.SemiBold16Black }}>{item.text}</Text>
        <MaterialCommunityIcons
          name={
            selectedLanguage === item.text ? "circle-slice-8" : "circle-outline"
          }
          size={24}
          color={selectedLanguage === item.text ? Colors.primary : Colors.grey}
        />
      </TouchableOpacity>
    );
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

      <Text
        style={{
          ...Fonts.Bold25Primary,
          textAlign: "center",
          marginVertical: Default.fixPadding * 2,
        }}
      >
        {tr("selectLanguage")}
      </Text>
      <Loader visible={visible} />
      <FlatList
        data={language}
        renderItem={renderItemLanguage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Modal isVisible={isAlertVisible} onBackdropPress={handleAlertClose}>
        <View style={{ backgroundColor: 'white', padding: 16 }}>
          <Text>{alertMessage}</Text>
          <Button
            title="OK"
            // width='20px'
            width='400'
            onPress={handleAlertClose}
            color="red" // Set the color of the button
            style={{ height: 100, marginTop: 8, width: 20 }} // Adjust the margin
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LanguageScreen;
