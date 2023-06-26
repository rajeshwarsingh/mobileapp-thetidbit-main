
import React, { Component, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';
const { convert } = require('html-to-text');
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {
  FONT_SIZE_EXTRA_LARGE,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
} from '../constants/Dimens';
import { GRAY, WHITE, DARK_GRAY, LIGHT_BLUE } from '../constants/Colors';
import { momentCalendarConfig, FONT_REGULAR } from '../constants/Constants';
import { getScreenWidth, getScreenHeight } from '../helpers/DimensionsHelper';
import { BannerAds } from '../components/AdMobComponent';
import { getShortUrl } from '../api/index';
import config from '../config';
import Loader from "../components/loader-simple";
const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();

const quotes = [
  {
    quote: "'I believe that true success is not measured by the wealth one accumulates, but by the positive impact one has on the lives of others.' - Ibrahim Linkan",
    image: "https://res.cloudinary.com/dkydl3enp/image/upload/v1687593725/thetidbit/white-ibraham_khh9ef.png"
  },
  {
    quote: "'Whatever you are, be a good one.' - Abraham Lincoln",
    image: "https://res.cloudinary.com/dkydl3enp/image/upload/v1687593725/thetidbit/white-ibraham_khh9ef.png"
  }
]

const QuoteAndImage = (contentLength) => {
  let imageUrl = quotes[0]['image'];
  let quote = quotes[0]['quote'];

  if (config.disableQuote || contentLength?.length > 260) {
    return null;
  } else if (contentLength?.length > 230) {
     imageUrl = quotes[1]['image'];
     quote = quotes[1]['quote'];
  } else {
     imageUrl = quotes[0]['image'];
     quote = quotes[0]['quote'];
  }

  return (
    <View style={{
      // flex: 2,
      flexDirection: 'row',
      marginTop: 5,
      // borderWidth: 1
    }}>
      <Text style={{
        flex: 2,
        fontWeight: '400',
        fontSize: FONT_SIZE_LARGE,
        // marginTop: 7,
        // lineHeight: 25,
        color: GRAY,
      }} >Todays Quote: {quote}</Text>
      <Image
        source={{ uri: imageUrl }}
        style={{ flex: 1, }}
        contentFit="cover"
      />
    </View>
  );
}

export default QuoteAndImage;