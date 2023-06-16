import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';
const { convert } = require('html-to-text');
import {
  FONT_SIZE_EXTRA_LARGE,
  FONT_SIZE_NORMAL,
  FONT_SIZE_LARGE,
  FONT_SIZE_SMALL,
} from '../constants/Dimens';
import { GRAY, WHITE, DARK_GRAY, LIGHT_BLUE } from '../constants/Colors';
import {  momentCalendarConfig } from '../constants/Constants';
import { BannerAds } from '../components/AdMobComponent';

export default class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageError: false,
    };
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    const currentProps = this.props;
    if (currentProps.data.hash_id !== nextProps.data.hash_id) {
      return true;
    } else {
      return false;
    }
  }

  getByLineText = () => {
    const { byline_1, created_at } = this.props.data;
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

  render() {
    const {
      source_name,
      title,
      image_url,
      content,
      bottom_headline,
      bottom_text,
      sourceLink,
    } = this.props.data;

    const shareFile = async () => {
      try {
        // Download the file using Expo FileSystem
        const fileUri = FileSystem.cacheDirectory + 'example.jpg';
        await FileSystem.downloadAsync('https://st1.thehealthsite.com/wp-content/uploads/2023/05/Weight-Loss-1.jpg', fileUri);

        // Share the file using Expo Sharing
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Is it a snake or a hat?',
        });
      } catch (error) {
        console.error('Error sharing file:', error);
      }
    };

    const options = { wordwrap:400 };
    const text = convert(content?.substr(0, 400),options);

    const ShareAndReadme = () => {
      return (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text onPress={async () => await WebBrowser.openBrowserAsync(sourceLink)} style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginHorizontal: 10,
          }}>...read more</Text>
          <Text onPress={shareFile} style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginHorizontal: 10,
            color: LIGHT_BLUE,
          }}>Share</Text>
        </View>
      );
    }

    const handleImageError = () => {
      alert(1)
      this.setState({imageError:true});
    };
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View>
            <BannerAds />
          </View>
          {/* HANDLE IMAGE */}
          {!this.state.imageError ? (
            <Image
            source={{ uri: "http://example.com/a.jpg" }}
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
         
        </View>

        <View style={[styles.middle, styles.contentPadding]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{text}</Text>
          <ShareAndReadme />
          <Text style={styles.byLine} numberOfLines={1} ellipsizeMode="tail"> {this.getByLineText()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: WHITE,
  },
  top: {
    backgroundColor: WHITE,
    flex: 4,
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
    // fontFamily: FONT_REGULAR,
    fontWeight: '400',
    fontSize: FONT_SIZE_EXTRA_LARGE,
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