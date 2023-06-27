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
import QuoteAndImage from '../components/QuoteAndImage';
import { getShortUrl } from '../api/index';
import Loader from "../components/loader-simple";
const SCREEN_WIDTH = getScreenWidth();
const SCREEN_HEIGHT = getScreenHeight();
export default function NewsCard(props) {

  const {
    source_name,
    title,
    image_url,
    content,
    description,
    bottom_headline,
    bottom_text,
    sourceLink,
    key,
  } = props.data;

  const [imageError, setImageError] = useState(false);
  const [visible, setVisible] = useState(false);

  getByLineText = () => {
    const { byline_1, created_at } = props.data;
    if (!byline_1) {
      return null;
    }

    return byline_1
      .map(item => {
        const { type, text } = item;
        if (type === 'TEXT') {
          return text.trim();
        } else if (type === 'TIME') {
          return moment(created_at).calendar(null, momentCalendarConfig);
        } else {
          return '';
        }
      })
      .join(' ');
  };

  const handleShare = async () => {
    setVisible(true);
    const shortLink = await getShortUrl(`https://www.thetidbit.in/sharenews?newsInx=${sourceLink}&newsInxShow=${encodeURIComponent(key)}`);
    let imagePath = "";
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', (image_url || "https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg"))
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then((base64Data) => {
        // here's base64 encoded image
        var imageUrl = 'data:image/png;base64,' + base64Data;
        let shareImage = {
          title: title, //string
          message: `${title} . Please install the app : ${shortLink}`, //string

          url: imageUrl,
          // urls: [imageUrl, imageUrl], // eg.'http://img.gemejo.com/product/8c/099/cf53b3a6008136ef0882197d5f5.jpg',
        };
        setVisible(false);
        Share.open(shareImage)
          .then((res) => {
            // console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });
        // remove the file from storage
        // return fs.unlink(imagePath);
      });
  }

  const ShareAndReadme = () => {
    return (
      <View style={{
        flexDirection: 'row',
        // alignItems: 'center',
      }}>
        <Text onPress={async () => await WebBrowser.openBrowserAsync(sourceLink)} style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginHorizontal: 10,
        }}>...read more</Text>
        <Text onPress={handleShare} style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginHorizontal: 10,
          color: LIGHT_BLUE,
        }}>Share news</Text>
      </View>
    );
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const showDescription = () => {
    const options = { wordwrap: 400 };
    const text = convert((content ? content : description)?.substr(0, 400), options);
    let descriptionText = text.replace(/\[.*\]$/, '');
    return (descriptionText || '').replace(/\s{2,}/g, ' ') // MORE THAN 2 SPACE TRIM TO ONE
  }

  // const isQuoteShow = () => {
  //   const contentLength = title + showDescription() || '';
  //   if (contentLength.length < 260) return true;
  //   return false
  // }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View>
          <BannerAds />
        </View>
        {/* HANDLE IMAGE */}
        {(image_url && !imageError) ? (
          <Image
            source={{ uri: image_url }}
            style={{ flex: 1 }}
            contentFit="cover"
            onError={handleImageError}
          />
        ) : (
          <Image
            source={{ uri: 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }}
            style={{ flex: 1 }}
            contentFit="cover"
          />
        )}
        {/* HANDLE IMAGE */}

      </View>
      <View style={[styles.middle, styles.contentPadding]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{showDescription()}</Text>
        <Loader visible={visible} />
        {QuoteAndImage(title + showDescription() || '')}
        <ShareAndReadme />
        <Text style={styles.byLine} numberOfLines={1} ellipsizeMode="tail"> {getByLineText()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
    // borderWidth: 1,
    heighl: SCREEN_HEIGHT,
  },
  top: {
    backgroundColor: WHITE,
    flex: 6,
  },
  middle: {
    backgroundColor: WHITE,
    flex: 5,
  },
  footer: {
    flex: 0.9,
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    backgroundColor: DARK_GRAY,
  },
  contentPadding: {
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 19,
    marginTop: 12,
  },
  description: {
    // fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_LARGE,
    marginTop: 7,
    lineHeight: 25,
    color: GRAY,
  },
  readMore: {
    // fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_LARGE,
    marginTop: 7,
    lineHeight: 25,
    color: LIGHT_BLUE,
  },
  byLine: {
    // fontFamily: FONT_LIGHT,
    fontWeight: '300',
    fontSize: FONT_SIZE_NORMAL,
    marginTop: 5,
    color: GRAY,
    opacity: 0.7,
  },
  footerTitle: {
    // fontFamily: FONT_REGULAR,
    fontWeight: '400',
    color: WHITE,
    fontSize: FONT_SIZE_NORMAL,
    fontWeight: '600',
  },
  footerSubtitle: {
    color: WHITE,
    fontWeight: '300',
    // fontFamily: FONT_LIGHT,
    fontSize: FONT_SIZE_SMALL,
    fontWeight: '400',
    marginTop: 2,
  },
});