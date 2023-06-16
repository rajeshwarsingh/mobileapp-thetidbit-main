
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import Icon from 'react-native-vector-icons/Ionicons';
import { getAppLatestVersion } from '../api/index';
import { compareAppVersions } from '../utils/index';

const App = () => {
  const [isManualUpdateAvailable, setIsManualUpdateAvailable] = useState(false);

  // CODE FOR MANUALLY CHECKING UPDATE AND SENDING TO PLAYSTORE
  useEffect(() => {
    getAppLatestVersion().then(({ versionPS }) => {
      const versionCur = Constants.manifest.version;
      if (compareAppVersions(versionCur, versionPS) < 0) {
        setIsManualUpdateAvailable(true);
      }
    })
  }, [])


  if (!isManualUpdateAvailable) return null
  return (
    <View style={styles.container}>
    <Icon name="ios-cloud-download" size={24} color="white" style={styles.icon} />
      <Text style={styles.text}>New update available</Text>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL("http://play.google.com/store/apps/details?id=com.mobileappthetidbit")}>
        <Text style={styles.buttonText}>Update available</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#44465B',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: 'white',
    marginRight: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});


const styles1 = StyleSheet.create({
  container:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 10,

    // backgroundColor: '#44465B',
    // height:60,
    // pagdding:22,
    // alignItems:'center'
  },
  button: {
    width:100,
    height:40,
    margin:14,
    // marginBottom:10,
    // pagdding:10,
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
