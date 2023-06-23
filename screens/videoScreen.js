import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
  Button
} from "react-native";
import * as WebBrowser from 'expo-web-browser';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import Carousel from 'react-native-snap-carousel';
import * as Updates from 'expo-updates';
import { Colors, Fonts, Default } from "../constants/style";
import { getNewsApi } from '../api/index';
import { getScreenWidth, getScreenHeight } from '../helpers/DimensionsHelper';
import NewsCard from '../components/NewsCard';
import ManualUpdate from '../components/ManualUpdate';
import NavigationContext from '../components/NavigationContext';
import Loader from "../components/loader";
import {getSwapNewsCacheData, updateSwapNewsCacheData, logOutput} from "../utils/index"
const SCREEN_WIDTH = getScreenWidth();

const VideoScreen = ({ route }) => {
  let {notiOrShareCliecked=false, title='', url='' } = route.params || {};
  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@VideoScreen",route.params)
  const { category } = useContext(NavigationContext);
  const [breakingNews, setBreakingNews] = useState([])
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`videoScreen:${key}`);
  }

  // CODE TO CHECKING UPDATE USING EXPO EAS FOR UPDATE
  useEffect(() => {
    checkUpdate()
  }, [])

  //HANDLE IF USER CLICK NOTIFICATION OR SHARE-LINK
  useEffect(()=>{
    _ClickedNotiOrSHare();
  },[notiOrShareCliecked]);

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

  const _getNewsAndupdateCache = async()=>{
    // logOutput({functionName : 'getNewsAndupdateCache', msg:`Entered`});
     // CALL NEWS API
      const newsData = await getNewsApi({ newsType: 'swapable' });
      let formatedBreakingNews = newsData?.data.map((news) => {
        setVisible(false);
        return {
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
      // logOutput({functionName : 'handleDisplayNews', msg:`formatedBreakingNews data: ${formatedBreakingNews}`});
      
      // ADD THE CONDITION WHEN TO UPDATE
    if (true) {
      // UPDATE NEWS
      setBreakingNews(formatedBreakingNews);

      // UPDATE THE CACHE
      updateSwapNewsCacheData(formatedBreakingNews);
    }
    // handleNotification or clicked conditions
    _ClickedNotiOrSHare();
  }

  const _ClickedNotiOrSHare = ()=>{

    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@1",(notiOrShareCliecked && title,notiOrShareCliecked) , title)
    // if(notiOrShareCliecked && title){
    //   const matchedIndex = breakingNews.findIndex((item) => item.title === title);
    //   console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2",matchedIndex);
    //   if(matchedIndex!==-1){
    //     setTimeout(()=>{navigateToItem(matchedIndex)},0);
    //   }else{
    //     // open the browser
    //     _handlePressButtonAsync(url)
    //   }
      
    // }
    navigateToItem(11);
    
  }

  const handleDisplayNews = async()=>{
    // CHECK CACHED NEWSDATA
    let cacheData = await getSwapNewsCacheData();
    // logOutput({functionName : 'handleDisplayNews', msg:`cache data: ${cacheData}`});

    // IF CACHE NOT AVAILABLE - CALL METHOD GET NEWS AND UPDATE CACHE
      if(!cacheData)  {
        setVisible(false);
        return _getNewsAndupdateCache();
      }
      

    // IF CACHE AVAILABLE
      // SET CACHED NEWS
      setVisible(false)
      setBreakingNews(cacheData);
      
      // CALL METHOD GET NEWS AND UPDATE CACHE
      _getNewsAndupdateCache();
    }

  useEffect(() => {
    try{
      setVisible(true)
      handleDisplayNews();
    }catch(e){
      // logOutput({functionName : 'Video screen page : handleDisplayNews', msg:`Chache block: ${e}`});
    }
    
    // setVisible(true)
    // getNewsApi({ newsType: 'swapable' }).then((response) => {
    //   let formatedBreakingNews = response?.data.map((news) => {
    //     setVisible(false);
    //     return {
    //       source_name: news.author,
    //       title: news.title,
    //       image_url: news.logo,
    //       content: news.content,
    //       description: news.description,
    //       bottom_headline: news.description,
    //       bottom_text: "",
    //       sourceLink: news.sourceLink,
    //     }
    //   });
    //   setBreakingNews(formatedBreakingNews);

    // }).catch((reason) => console.log("Error in videoscreen api:", reason));
  }, [i18n.language, category]);

  const renderItem = ({ item, index }) => {
    return (
      <NewsCard key={String(index)} data={item} />
    );
  };

  const carouselRef = useRef(null);

  const navigateToItem = (index) => {
    carouselRef.current.snapToItem(index);
  };

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
        <Carousel
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
          // lockScrollWhileSnapping={true}
          windowSize={5}
          enableMomentum={true} //VERY IMPORTANT FOR SWAPING EFFECT
          decelerationRate={0}
          activeSlideOffset={0}
        />
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