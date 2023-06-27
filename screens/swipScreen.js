import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button
} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { useTranslation } from "react-i18next";
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import Swiper from 'react-native-swiper'
import { Colors, Fonts, Default } from "../constants/style";
import { getNewsApi } from '../api/index';
import { getScreenWidth, getScreenHeight } from '../helpers/DimensionsHelper';
import NewsCard from '../components/SwiperNewsCard';
import ManualUpdate from '../components/ManualUpdate';
import NavigationContext from '../components/NavigationContext';
import Loader from "../components/loader";
import { logOutput } from "../utils/index";
import { getSwapNewsCacheData, updateSwapNewsCacheData } from "../utils/storeNewsInFile"
const SCREEN_WIDTH = getScreenWidth();
OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);

const VideoScreen = () => {
  const { category } = useContext(NavigationContext);
  const [breakingNews, setBreakingNews] = useState([])
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [curItemIndex, setCurItemIndex] = useState(0);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() == "rtl";
  function tr(key) {
    return t(`videoScreen:${key}`);
  }

  // CODE TO CHECKING UPDATE USING EXPO EAS FOR UPDATE
  useEffect(() => {
    checkUpdate()
  }, []);

  async function checkUpdate() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setIsUpdateAvailable(true);
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // console.log(`Error fetching latest Expo update: ${error}`);
    }
  }

  async function onFetchUpdateAsync() {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      alert(`update app failed:${error}`)
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const _handleDeeplinkUrl = async () => {
    const handleDeepLink = (e) => {
      let data = Linking.parse(e.url);
      let url = data?.queryParams?.newsInx || "";
    }

    const url = await Linking.getInitialURL();
    const route = Linking.parse(url);
    let newsUrl = route?.queryParams?.newsInx;

    if (newsUrl) {
      _ClickedNotiOrSHare(newsUrl)
    }

    Linking.addEventListener('url', handleDeepLink)
  }

  const _handleOSNotification = async () => {
    // HANDLING PUSH NOTIFICATION ON FORGROUND, WHEN APP IS ALREADY OPEN
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("Handle forground os notification :", notificationReceivedEvent)
    });

    // HANDLING WHEN NOTIFICAITON OPENED
    OneSignal.setNotificationOpenedHandler(async (openedEvent) => {
      // setBreakingNews([]);
      // await handleDisplayNews();

      const { notification } = openedEvent;
      const { url = "" } = notification?.additionalData;
      if (url) {
        _ClickedNotiOrSHare(url)
      }
    });
  }

  useEffect(() => {
    if (breakingNews.length > 0) {
      _handleDeeplinkUrl();
      _handleOSNotification();
    }
  }, [breakingNews])

  const _ClickedNotiOrSHare = (url) => {
    if (url) {
      const matchedIndex = breakingNews.findIndex((item) => item.sourceLink == url);
      if (matchedIndex !== -1) {
        setCurItemIndex(matchedIndex);
      } else {
        // open the browser
        _handlePressButtonAsync(url)
      }
    }
  }

  const _getNewsAndupdateCache = async (cacheData) => {
    // CALL NEWS API
    const newsData = await getNewsApi({ newsType: 'swapable' });
    let formatedBreakingNews = newsData?.data.map((news) => {
      setVisible(false);
      return {
        key: news.key,
        source_name: news.author,
        title: news.title,
        image_url: news.logo,
        content: news.content,
        description: news.description,
        bottom_headline: news.description,
        bottom_text: "",
        sourceLink: news.sourceLink,
      }
    });
    
    // CACHE DATA AND API DATA IF BOTH ARE SAME DO NOTHING ELSE UPDATE
    if (cacheData.length > 0 && formatedBreakingNews.length > 0 && cacheData[0]['sourceLink'] == formatedBreakingNews[0]['sourceLink']) {
      return;
    } else {
      // UPDATE NEWS
      setBreakingNews(formatedBreakingNews);
      // UPDATE THE CACHE
      updateSwapNewsCacheData(formatedBreakingNews);
    }
  }

  const handleDisplayNews = async () => {
    setVisible(true);
    // CHECK CACHED NEWSDATA
    let cacheData = await getSwapNewsCacheData();
    
    // IF CACHE NOT AVAILABLE - CALL METHOD GET NEWS AND UPDATE CACHE
    if (cacheData && Array.isArray(cacheData) && cacheData.length > 0) {
      setVisible(false);
      // IF CACHE AVAILABLE SET CACHED NEWS
      setBreakingNews(cacheData);
      setVisible(false);

      // CALL METHOD GET NEWS AND UPDATE CACHE
      _getNewsAndupdateCache(cacheData);
    } else {
      return _getNewsAndupdateCache([]);
    }
  }

  useEffect(() => {
    try {
      setBreakingNews([]);
      setTimeout(() => {
        handleDisplayNews();
      }, 0)

    } catch (e) {
      // logOutput({functionName : 'Video screen page : handleDisplayNews', msg:`Chache block: ${e}`});
    }
  }, [i18n.language, category]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      {isUpdateAvailable && <View>
        <Button title="Fetch update" onPress={onFetchUpdateAsync} />
      </View>}
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
          {tr("video")}
        </Text>
      </View>
      <Loader visible={visible} />
      <View style={styles.container}>
        {breakingNews.length > 0 && <Swiper
          automaticallyAdjustContentInsets={true}
          showsPagination={false}
          horizontal={false}
          index={curItemIndex}
          loop={false}
        >
          {breakingNews.map((item, index) => (
            <NewsCard key={String(index)} data={item} />
          ))}
        </Swiper>}
      </View>
      <ManualUpdate />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'lightgray',
    borderRadius: 10,
    padding: 20,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  swiperContentContainer: {
    alignItems: 'center',
  },
});

export default VideoScreen;