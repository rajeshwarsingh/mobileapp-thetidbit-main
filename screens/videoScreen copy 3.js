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
import Carousel from 'react-native-snap-carousel';
import * as Updates from 'expo-updates';
import * as Linking from 'expo-linking';
import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import { Colors, Fonts, Default } from "../constants/style";
import { getNewsApi } from '../api/index';
import { getScreenWidth, getScreenHeight } from '../helpers/DimensionsHelper';
import NewsCard from '../components/NewsCard';
import ManualUpdate from '../components/ManualUpdate';
import NavigationContext from '../components/NavigationContext';
import Loader from "../components/loader";
import { getSwapNewsCacheData, updateSwapNewsCacheData, logOutput } from "../utils/index"
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

  const carouselRef = useRef(null);

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
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      // alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  const _handlePressButtonAsync = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const _handleDeeplinkUrl = async () => {

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

  const _getNewsAndupdateCache = async () => {
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
    setVisible(false);
    // ADD THE CONDITION WHEN TO UPDATE
    if (true) {
      // UPDATE NEWS
      setBreakingNews(formatedBreakingNews);

      // UPDATE THE CACHE
      updateSwapNewsCacheData(formatedBreakingNews);
    }
  }

  const _ClickedNotiOrSHare = (url) => {
    if (url) {
      const matchedIndex = breakingNews.findIndex((item) => item.sourceLink == url);
      if (matchedIndex !== -1) {
        console.log("_ClickedNotiOrSHare Matched Index :",matchedIndex)
        setCurItemIndex(matchedIndex);
      } else {
        // open the browser
        _handlePressButtonAsync(url)
      }
    }
  }

  const handleDisplayNews = async () => {
    // CHECK CACHED NEWSDATA
    let cacheData = await getSwapNewsCacheData();

    // IF CACHE NOT AVAILABLE - CALL METHOD GET NEWS AND UPDATE CACHE
    if (!cacheData) {
      
      setVisible(true);
      return _getNewsAndupdateCache();
    }

    // IF CACHE AVAILABLE
    // SET CACHED NEWS
    setBreakingNews(cacheData);

    // CALL METHOD GET NEWS AND UPDATE CACHE
    _getNewsAndupdateCache();
  }

  useEffect(() => {
    try {
      handleDisplayNews();
    } catch (e) {
      // logOutput({functionName : 'Video screen page : handleDisplayNews', msg:`Chache block: ${e}`});
    }
  }, [i18n.language, category]);

  const renderItem = ({ item, index }) => {
    return (
      <NewsCard key={String(index)} data={item} />
    );
  };

  useEffect(()=>{
    if(breakingNews.length){
      carouselRef.current.snapToItem(curItemIndex);
    }
    
  },[curItemIndex]);

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
        {breakingNews.length>0 && <Carousel
          ref={carouselRef}
          data={breakingNews}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          sliderHeight={getScreenHeight()}
          itemWidth={SCREEN_WIDTH}
          itemHeight={getScreenHeight()}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          vertical={true}
          getItemLayout={(data, index) => (
            {length: getScreenHeight(), offset: getScreenHeight() * index, index}
          )}
          firstItem={curItemIndex}
          initialNumToRender={50}
          initialScrollIndex={curItemIndex}
          
          // initialNumToRender={50}
          // lockScrollWhileSnapping={true}
          windowSize={5}
          enableMomentum={true} //VERY IMPORTANT FOR SWAPING EFFECT
          decelerationRate={0}
          activeSlideOffset={0}
        />}
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
});

export default VideoScreen;