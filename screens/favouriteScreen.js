import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { View, Text, Button , Image, FlatList, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Fonts, Default } from "../constants/style";
import NavigationContext from '../components/NavigationContext';
import Loader from "../components/loader";
import {updateUser} from '../api/index'
const { height } = Dimensions.get("window");

const FavouriteScreenScreen = (props) => {
  // setting
  const { category,updateCategory } = useContext(NavigationContext);
    let { mobile='', prefLanguage="",setting=false } = props.route.params;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`FavouriteScreenScreen:${key}`);
  }
  const categories = [
    { id: 1, name: 'General', icon: 'category' },
    { id: 2, name: 'Sports', icon: 'sports' },
    { id: 3, name: 'Health/Yoga', icon: 'fitness-center' },
    { id: 4, name: 'Entertainment', icon: 'movie' },
  ];

  const toggleCategory = (category) => {
    const isSelected = selectedCategories.map(item => item.id).includes(category.id);
    let updatedCategories = [];

    if (isSelected) {
      updatedCategories = selectedCategories.filter((item) => {
        return (item.id !== category.id)

      });
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedCategories.map(item => item.id).includes(item.id);
    return (
      <TouchableOpacity
        // style={{
        //     backgroundColor: Colors.white,
        //     ...Default.shadow,
        //     borderRadius: 8,
        //     alignItems: "center",
        //     padding: Default.fixPadding * 1.5,
        //     marginBottom: Default.fixPadding * 1.5,
        //     flexDirection: isRtl ? "row-reverse" : "row",
        //     justifyContent: "space-between",
        //     marginHorizontal: Default.fixPadding * 1.5,
        //   }}
        onPress={() => toggleCategory(item)}>
        <View style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}>
          <Icon name={item.icon} size={24} color={isSelected ? 'white' : 'black'} />
          <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handlePressSubmit = async() => {
    
    try {
      setVisible(true);

      // IF SETTING IS TRUE MEANS USER COME FROM SETTING OPTION TO THIS SCREEN - IN THIS CASE GET MOBILE NUMBER FROM LOCAL STORAGE
      let userData = await AsyncStorage.getItem('userDetails');
      userData = JSON.parse(userData);

      if (setting) {
        if (!userData.mobile) {
          return alert('User not exist, please register')
        } else {
          mobile = userData.mobile;
          prefLanguage = userData.prefLanguage;
        }
      };

      const prefNews = selectedCategories.map(item=>item.name);

      let reqBody = { mobile, prefLanguage, prefNews };
      
      await updateUser(reqBody);
      
      userData.prefLanguage = prefLanguage;
      userData.prefNews=prefNews;
      await AsyncStorage.setItem('userDetails', JSON.stringify(userData));
      updateCategory(prefNews)
      setTimeout(() => {
        setVisible(false);
        return props.navigation.navigate("bottomTab");
      }, 1500);

    } catch (e) {
      setVisible(false);
      console.log('error in laguage saving', e)
      alert('EZrror in laguage saving');
      return props.navigation.navigate("bottomTab");
    }
  };

  useEffect(()=>{
    fetchUserDetails();
  },[])
  
  async function fetchUserDetails(){
    let userData = await AsyncStorage.getItem('userDetails');
    userData = JSON.parse(userData)
    let prefNews =userData.prefNews || [];
    const newPrefNews = categories.filter(item=>prefNews.includes(item.name))
    setSelectedCategories(newPrefNews);
  }

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
          source={require("../assets/image/newsTop.png")}
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
        {tr("selectFavourite")}
      </Text>
      <Loader visible={visible} />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handlePressSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
        {/* <Button title="Submit" onPress={handlePressSubmit} style={styles.submitButton} /> */}
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: Default.fixPadding * 1.5,
    marginBottom: Default.fixPadding * 1.5,
    // justifyContent: "space-between",
    marginHorizontal: Default.fixPadding * 1.5,
  },
  selectedItemContainer: {
    backgroundColor: '#2196f3',
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
    color: 'black',
  },
  selectedItemText: {
    color: 'white',
  },
  submitButton: {
    margin: 100,
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default FavouriteScreenScreen;
