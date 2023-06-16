import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";
import { getNewsApi } from '../api/index';
import { BannerAds, InterstitialAds } from '../components/AdMobComponent';
import Loader from "../components/loader";

const HomeScreen = (props) => {

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`homeScreen:${key}`);
  }

  const [breakingNews, setBreakingNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);
  const [nationalNews, setNationalNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);
  const [politicsNews, setPoliticsNews] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    getNewsApi({newsType:'home'}).then((response) => {
      setBreakingNews(response?.data?.breaking);
      setLocalNews(response.data.health);
      setNationalNews(response.data.entertainment);
      setWorldNews(response.data.sports);
      setPoliticsNews(response.data.technology);
      setVisible(false);
    });
  }, [i18n.language]);


  const _handlePressButtonAsync = async (e, link) => {
    await WebBrowser.openBrowserAsync(link);
  };

  const renderItemBreakingNews = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        {item.video ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <Image source={item.image} />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                paddingHorizontal: Default.fixPadding,
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  backgroundColor: Colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: Default.fixPadding * 2,
                }}
              >
                <Ionicons name="caret-forward" size={20} color={Colors.black} />
              </View>
              <View style={{ flexDirection: isRtl ? "row-reverse" : "row" }}>
                <Text
                  style={{
                    ...Fonts.SemiBold14White,
                    paddingBottom: Default.fixPadding * 0.5,
                  }}
                >
                  {item.title}
                </Text>
                <Image
                  source={item.logo}
                  style={{
                    alignSelf: isFirst ? "flex-start" : "flex-end",
                    margin: Default.fixPadding * 0.5,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={(e) => _handlePressButtonAsync(e, item.sourceLink)}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 263, height: 138 }} />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                paddingHorizontal: Default.fixPadding,
                flexDirection: isRtl ? "row-reverse" : "row",
              }}
            >
              <Text
                style={{
                  ...Fonts.SemiBold14White,
                  paddingBottom: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <Image
                source={{ uri: item.logo ? item.logo : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }}
                style={{
                  alignSelf: isFirst ? "flex-start" : "flex-end",
                  margin: Default.fixPadding * 0.5,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const newsData = [
    {
      key: "1",
      name: tr("news"),
    },
    {
      key: "2",
      name: tr("sports"),
    },
    {
      key: "3",
      name: tr("regional"),
    },
    {
      key: "4",
      name: tr("finance"),
    },
    {
      key: "5",
      name: tr("education"),
    },
    {
      key: "6",
      name: tr("health"),
    },
    {
      key: "7",
      name: tr("other"),
    },
  ];
  const [selectedNewsData, setSelectedNewsData] = useState(tr("news"));

  const renderItemNewsData = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <TouchableOpacity
        onPress={() => setSelectedNewsData(item.name)}
        style={{
          ...Default.shadow,
          marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
          marginRight: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
          backgroundColor:
            selectedNewsData === item.name ? Colors.primary : Colors.white,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            ...(selectedNewsData === item.name
              ? Fonts.SemiBold16White
              : Fonts.SemiBold16Grey),
            padding: Default.fixPadding,
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItemLocalNews = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        {item.video ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={item.image} />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: 0,
                  top: 0,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={item.logo} />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={(e) => _handlePressButtonAsync(e, item.sourceLink)}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 263, height: 138 }} />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={{ uri: item.logo ? item.logo : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }}
                />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItemNationalNews = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        {item.video ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={item.image} />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: 0,
                  top: 0,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={item.logo} />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={(e) => _handlePressButtonAsync(e, item.sourceLink)}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 263, height: 138 }} />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={{ uri: item.logo ? item.logo : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }}
                />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItemWorldNews = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        {item.video ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={item.image} />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: 0,
                  top: 0,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={item.logo} />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={(e) => _handlePressButtonAsync(e, item.sourceLink)}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 263, height: 138 }} />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={{ uri: item.logo ? item.logo : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderItemPoliticsNews = ({ item, index }) => {
    const isFirst = index === 0;
    return (
      <View>
        {item.video ? (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={item.image} />
              <View
                style={{
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  bottom: 0,
                  top: 0,
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    backgroundColor: Colors.white,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="caret-forward"
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={item.logo} />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={(e) => _handlePressButtonAsync(e, item.sourceLink)}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 2,
            }}
          >
            <View>
              <Image source={{ uri: item.urlToImage ? item.urlToImage : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }} style={{ width: 263, height: 138 }} />
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  alignSelf: isRtl ? "flex-start" : "flex-end",
                  padding: Default.fixPadding,
                }}
              >
                <Image source={{ uri: item.logo ? item.logo : 'https://res.cloudinary.com/dkydl3enp/image/upload/v1686501064/Picsart_23-06-11_21-57-08-972_yvzlrb.jpg' }}
                />
              </View>
            </View>
            <View
              style={{
                width: 260,
              }}
            >
              <Text
                style={{
                  ...Fonts.Medium14Black,
                  marginTop: Default.fixPadding * 0.5,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: isRtl ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: Default.fixPadding,
                }}
              >
                <View
                  style={{
                    flexDirection: isRtl ? "row-reverse" : "row",
                  }}
                >
                  <Ionicons
                    name="bookmark-outline"
                    size={18}
                    color={Colors.grey}
                  />
                  <Ionicons
                    name="share-social-outline"
                    size={18}
                    color={Colors.grey}
                    style={{ marginHorizontal: Default.fixPadding }}
                  />
                </View>

                <Text style={{ ...Fonts.Medium14Grey }}>5 min ago</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <View
        style={{
          flexDirection: isRtl ? "row-reverse" : "row",
          padding: Default.fixPadding * 1.5,
        }}
      >
        <View
          style={{ flex: 8, alignItems: isRtl ? "flex-end" : "flex-start" }}
        >
          <Image
            source={require("../assets/image/newsPrimary.png")}
            style={{ height: 28, width: 90 }}
          />
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: isRtl ? "row-reverse" : "row",
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate("videoScreen")}
            style={{ marginHorizontal: Default.fixPadding }}
          >
            <MaterialIcons name="live-tv" size={24} color={Colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("notificationScreen")}
          >
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors.primary}
            />
            <View
              style={{
                height: 6,
                width: 6,
                borderRadius: 3,
                backgroundColor: Colors.red,
                justifyContent: "center",
                alignItems: "center",
                top: "15%",
                left: "55%",
                position: "absolute",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Loader visible={visible} />
      <InterstitialAds />

      <TouchableOpacity
        // onPress={() => props.navigation.navigate("searchScreen")}
        style={{
          ...Default.shadow,
          flexDirection: isRtl ? "row-reverse" : "row",
          backgroundColor: Colors.white,
          borderRadius: 10,
          padding: Default.fixPadding * 0.8,
          marginHorizontal: Default.fixPadding * 1.5,
          marginBottom: Default.fixPadding * 2,
        }}
      >
        <Ionicons
          name="search-outline"
          color={Colors.grey}
          size={22}
          style={{
            flex: 0.6,
            justifyContent: "center",
            alignSelf: "center",
            marginLeft: isRtl ? 0 : Default.fixPadding * 0.5,
            marginRight: isRtl ? Default.fixPadding * 0.5 : 0,
          }}
        />
        <Text
          style={{
            ...Fonts.SemiBold16Grey,
            flex: 9.4,
            textAlign: isRtl ? "right" : "left",
            marginHorizontal: Default.fixPadding,
            paddingVertical: Default.fixPadding * 0.5,
          }}
        >
          {tr("search")}
        </Text>
      </TouchableOpacity>
      <View>

        {/* <AdMobBanner
        bannerSize="banner"
        adUnitID="ca-app-pub-9155008277126927/7669993848"
        // servePersonalizedAds // Optional
        onDidFailToReceiveAdWithError={(error) => console.error('error******************** :',error)}
      /> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.Bold18Black }}>{tr("breakingNews")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("breakingNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={breakingNews}
          renderItem={renderItemBreakingNews}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        {/* <FlatList
          horizontal
          nestedScrollEnabled
          data={newsData}
          renderItem={renderItemNewsData}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        /> */}
        <BannerAds />
        {/* <InterstitialAds/> */}

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.Bold18Black }}>Sports</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("worldNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={worldNews}
          renderItem={renderItemWorldNews}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >

          <Text style={{ ...Fonts.Bold18Black }}>{tr("localNews")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={localNews}
          renderItem={renderItemLocalNews}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.Bold18Black }}>{tr("nationalNews")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("nationalNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={nationalNews}
          renderItem={renderItemNationalNews}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />

        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginBottom: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.Bold18Black }}>Technology</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("politicNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          nestedScrollEnabled
          data={politicsNews}
          renderItem={renderItemPoliticsNews}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
