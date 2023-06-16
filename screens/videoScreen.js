import React, { useEffect, useState, useContext } from "react";
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
const SCREEN_WIDTH = getScreenWidth();
import NavigationContext from '../components/NavigationContext';
import Loader from "../components/loader";

const VideoScreen = (props) => {
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

  async function checkUpdate() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setIsUpdateAvailable(true);
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      console.log(`Error fetching latest Expo update: ${error}`);
    }
  }

  async function onFetchUpdateAsync() {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  useEffect(() => {
    setVisible(true)
    getNewsApi({newsType:'swapable'}).then((response) => {
      let formatedBreakingNews = response?.data.map((news) => {
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
      })
      setBreakingNews(formatedBreakingNews);

    }).catch((reason)=>console.log("Error in videoscreen api:",reason));
  }, [i18n.language, category]);

  const _handlePressButtonAsync = async (e, item) => {
    await WebBrowser.openBrowserAsync(item.sourceLink);
  };

  const renderItemBreakingNews = ({ item, index }) => {
    const isFirst = index === 0;
    // alert(item)
    return (
      <TouchableOpacity
        onPress={(e) => _handlePressButtonAsync(e, item)}
        style={{
          ...Default.shadow,
          backgroundColor: Colors.white,
          borderRadius: 10,
          marginHorizontal: Default.fixPadding * 1.5,
          marginTop: isFirst ? Default.fixPadding * 1.5 : 0,
          marginBottom: Default.fixPadding * 1.5,
          borderColor: Colors.primary,
          flexDirection: isRtl ? "row-reverse" : "row",
          overflow: "hidden",
        }}
      >
        <Image source={{ uri: item.image ? item.image : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 131, height: 148 }} />
        <View
          style={{
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: Colors.white,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            alignSelf: "center",
            marginHorizontal: Default.fixPadding * 5,
          }}
        >
          <Ionicons name="caret-forward" size={20} color={Colors.black} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: isRtl ? "flex-end" : "flex-start",
            marginHorizontal: Default.fixPadding,
          }}
        >
          <Text
            style={{
              ...Fonts.Medium16Black,
              maxWidth: "80%",
              textAlign: isRtl ? "right" : "left",
            }}
          >
            {item.description}
          </Text>
          <Text
            style={{
              ...Fonts.Medium14Grey,
              marginVertical: Default.fixPadding * 0.5,
            }}
          >
            {item.time}
          </Text>
          <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
            <Ionicons
              name="bookmark-outline"
              size={18}
              color={Colors.primary}
            />
            <Ionicons
              name="share-social-outline"
              size={18}
              color={Colors.primary}
              style={{ marginHorizontal: Default.fixPadding }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const renderItem = ({ item, index }) => {
    return (
      <NewsCard key={String(index)} data={item} />
    );
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
          data={breakingNews}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          sliderHeight={getScreenHeight()}
          itemWidth={SCREEN_WIDTH}
          itemHeight={getScreenHeight()}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          vertical={true}
          lockScrollWhileSnapping={true}
          swipeThreshold={70}
          nestedScrollEnabled
          windowSize={5}
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