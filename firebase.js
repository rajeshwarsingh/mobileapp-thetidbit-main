// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDvLhI8JZBP3SUtOe4tC4iRl12ERp_VElk",
//   authDomain: "thetidbit-project.firebaseapp.com",
//   projectId: "thetidbit-project",
//   storageBucket: "thetidbit-project.appspot.com",
//   messagingSenderId: "1072524645797",
//   appId: "1:1072524645797:web:9718fea1b831fc7ef8044c",
//   measurementId: "G-B66PWD75LD"
// };

// if (!firebase.apps.length) {
//   if (Platform.OS === 'android') {
//     firebase.initializeApp(firebaseConfig);
//   } else {
//     firebase.default.initializeApp(firebaseConfig);
//   }
// }

// export default firebase;


import React, { useState } from 'react';
import { View, Button } from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import firebase from 'expo-firebase-app';

const firebaseConfig = {
  apiKey: "AIzaSyDvLhI8JZBP3SUtOe4tC4iRl12ERp_VElk",
  authDomain: "thetidbit-project.firebaseapp.com",
  projectId: "thetidbit-project",
  storageBucket: "thetidbit-project.appspot.com",
  messagingSenderId: "1072524645797",
  appId: "1:1072524645797:web:9718fea1b831fc7ef8044c",
  measurementId: "G-B66PWD75LD"
};

firebase.initializeApp(firebaseConfig);

export default firebase;