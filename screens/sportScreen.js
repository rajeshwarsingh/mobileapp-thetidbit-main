import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import { Colors, Fonts, Default } from "../constants/style";

const SportScreen = (props) => {
  const backAction = () => {
    props.navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() == "rtl";

  function tr(key) {
    return t(`sportScreen:${key}`);
  }

  const finance = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo1.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit. ",
      image: require("../assets/image/photo13.png"),
      logo: require("../assets/image/icon2.png"),
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.  ",
      image: require("../assets/image/photo1.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo3.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
  ];
  const renderItemFinance = ({ item, index }) => {
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
                    paddingBottom: Default.fixPadding,
                  }}
                >
                  {item.description}
                </Text>
                <Image
                  source={item.logo}
                  style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={item.image} />
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
                  paddingBottom: Default.fixPadding,
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.logo}
                style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const economy = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo4.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit. ",
      image: require("../assets/image/photo5.png"),
      logo: require("../assets/image/icon2.png"),
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.  ",
      image: require("../assets/image/photo6.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo7.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
  ];
  const renderItemEconomy = ({ item, index }) => {
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
                    paddingBottom: Default.fixPadding,
                  }}
                >
                  {item.description}
                </Text>
                <Image
                  source={item.logo}
                  style={{
                    alignSelf: "flex-end",
                    margin: Default.fixPadding,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={item.image} />
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
                  paddingBottom: Default.fixPadding,
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.logo}
                style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const business = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo8.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit. ",
      image: require("../assets/image/photo5.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.  ",
      image: require("../assets/image/photo10.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo4.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
  ];
  const renderItemBusiness = ({ item, index }) => {
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
                    paddingBottom: Default.fixPadding,
                  }}
                >
                  {item.description}
                </Text>
                <Image
                  source={item.logo}
                  style={{
                    alignSelf: "flex-end",
                    margin: Default.fixPadding,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={item.image} />
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
                  paddingBottom: Default.fixPadding,
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.logo}
                style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const stockMarket = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo12.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit. ",
      image: require("../assets/image/photo13.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.  ",
      image: require("../assets/image/photo14.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo15.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
  ];
  const renderItemStockMarket = ({ item, index }) => {
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
                    paddingBottom: Default.fixPadding,
                  }}
                >
                  {item.description}
                </Text>
                <Image
                  source={item.logo}
                  style={{
                    alignSelf: "flex-end",
                    margin: Default.fixPadding,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={item.image} />
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
                  paddingBottom: Default.fixPadding,
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.logo}
                style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const smallBusiness = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo16.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit. ",
      image: require("../assets/image/photo17.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.  ",
      image: require("../assets/image/photo18.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo19.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
  ];
  const renderItemSmallBusiness = ({ item, index }) => {
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
                    paddingBottom: Default.fixPadding,
                  }}
                >
                  {item.description}
                </Text>
                <Image
                  source={item.logo}
                  style={{
                    alignSelf: "flex-end",
                    margin: Default.fixPadding,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={item.image} />
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
                  paddingBottom: Default.fixPadding,
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.logo}
                style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const savings = [
    {
      key: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo20.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
    {
      key: "2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit. ",
      image: require("../assets/image/photo21.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.  ",
      image: require("../assets/image/photo22.png"),
      logo: require("../assets/image/icon.png"),
      video: false,
    },
    {
      key: "4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing dolor elit.",
      image: require("../assets/image/photo23.png"),
      logo: require("../assets/image/icon.png"),
      video: true,
    },
  ];
  const renderItemSavings = ({ item, index }) => {
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
                    paddingBottom: Default.fixPadding,
                  }}
                >
                  {item.description}
                </Text>
                <Image
                  source={item.logo}
                  style={{
                    alignSelf: "flex-end",
                    margin: Default.fixPadding,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("newsDetailScreen")}
            style={{
              marginLeft: isFirst ? Default.fixPadding * 1.5 : 0,
              marginRight: Default.fixPadding * 1.5,
              marginBottom: Default.fixPadding * 1.5,
            }}
          >
            <Image source={item.image} />
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
                  paddingBottom: Default.fixPadding,
                }}
              >
                {item.description}
              </Text>
              <Image
                source={item.logo}
                style={{ alignSelf: "flex-end", margin: Default.fixPadding }}
              />
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
          paddingVertical: Default.fixPadding,
          backgroundColor: Colors.white,
          flexDirection: isRtl ? "row-reverse" : "row",
        }}
      >
        <TouchableOpacity
          style={{ marginHorizontal: Default.fixPadding * 1.5 }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name={isRtl ? "arrow-forward" : "arrow-back"}
            size={25}
            color={Colors.black}
          />
        </TouchableOpacity>
        <Text style={{ ...Fonts.Bold18Black }}>{tr("finance")}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: isRtl ? "row-reverse" : "row",
            justifyContent: "space-between",
            marginHorizontal: Default.fixPadding * 1.5,
            marginVertical: Default.fixPadding,
          }}
        >
          <Text style={{ ...Fonts.SemiBold16Black }}>{tr("personal")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={finance}
          renderItem={renderItemFinance}
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
          <Text style={{ ...Fonts.SemiBold16Black }}>{tr("economy")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={economy}
          renderItem={renderItemEconomy}
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
          <Text style={{ ...Fonts.SemiBold16Black }}>{tr("business")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={business}
          renderItem={renderItemBusiness}
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
          <Text style={{ ...Fonts.SemiBold16Black }}>{tr("stockMarket")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={stockMarket}
          renderItem={renderItemStockMarket}
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
          <Text style={{ ...Fonts.SemiBold16Black }}>
            {tr("smallBusiness")}
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={smallBusiness}
          renderItem={renderItemSmallBusiness}
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
          <Text style={{ ...Fonts.SemiBold16Black }}>{tr("savings")}</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("localNewsScreen")}
          >
            <Text style={{ ...Fonts.Bold16Primary }}>{tr("seeAll")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          nestedScrollEnabled
          data={savings}
          renderItem={renderItemSavings}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SportScreen;
