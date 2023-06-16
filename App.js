import "./ignoreWarning";
import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { withTranslation } from "react-i18next";
import 'expo-dev-client';
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./screens/auth/splashScreen";
import OnboardingScreen from "./screens/auth/onboardingScreen";
import LoginScreen from "./screens/auth/loginScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import LanguageScreen from "./screens/auth/languageScreen";
import BottomTab from "./components/bottomTab";
import LocalNewsScreen from "./screens/localNewsScreen";
import NationalNewsScreen from "./screens/nationalNewsScreen";
import WorldNewsScreen from "./screens/worldNewsScreen";
import PoliticNewsScreen from "./screens/politicNewsScreen";
import NewsDetailScreen from "./screens/newsDetailScreen";
import VideoDetailScreen from "./screens/videoDetailScreen";
import BreakingNewsScreen from "./screens/breakingNewsScreen";
import CommentScreen from "./screens/commentScreen";
import LiveTvScreen from "./screens/liveTvScreen";
import NotificationScreen from "./screens/notificationScreen";
import SearchScreen from "./screens/searchScreen";
import SportScreen from "./screens/sportScreen";
import TodayScreen from "./screens/todayScreen";
import TomorrowScreen from "./screens/tomorrowScreen";
import DayScreen from "./screens/dayScreen";
import EditProfileScreen from "./screens/editProfileScreen";
import BookmarkScreen from "./screens/bookmarkScreen";
import SettingScreen from "./screens/settingScreen";
import MainLanguageScreen from "./screens/mainLanguageScreen";
import ReaderModeScreen from "./screens/readerModeScreen";
import TermsConditionScreen from "./screens/termsConditionScreen";
import ChannelScreen from "./screens/channelScreen";
import FollowChannelScreen from "./screens/followChannelScreen";
import FavouriteScreen from "./screens/favouriteScreen";
import NavigationService from './services/NavigationService';
import {handleOSPushNotification} from './handler/handleOSPushNotification';
import {handleDeeplinkUrl} from "./handler/handleDeeplinkUrl";
import { NavigationProvider } from './components/NavigationContext';

// DO NOT REMOVE THIS LINE REQUIRED TO HANDLE LANGUAGE
import i18n from "./languages/index"; 

handleOSPushNotification();
handleDeeplinkUrl();

const Stack = createStackNavigator();

const MainNavigation = (props) => {
  
  return (
    <NavigationProvider>
    <NavigationContainer ref={NavigationService.setNavigationRef}>
      <Stack.Navigator
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen
          name="splashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="onboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="loginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="registerScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="verificationScreen"
          component={VerificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="languageScreen"
          component={LanguageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="favouriteScreen"
          component={FavouriteScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bottomTab"
          component={BottomTab}
          options={{
            ...TransitionPresets.DefaultTransition,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="breakingNewsScreen"
          component={BreakingNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="localNewsScreen"
          component={LocalNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="nationalNewsScreen"
          component={NationalNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="worldNewsScreen"
          component={WorldNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="politicNewsScreen"
          component={PoliticNewsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="newsDetailScreen"
          component={NewsDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="videoDetailScreen"
          component={VideoDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="commentScreen"
          component={CommentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="liveTvScreen"
          component={LiveTvScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notificationScreen"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="searchScreen"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sportScreen"
          component={SportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="todayScreen"
          component={TodayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tomorrowScreen"
          component={TomorrowScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="dayScreen"
          component={DayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bookmarkScreen"
          component={BookmarkScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="settingScreen"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="mainLanguageScreen"
          component={MainLanguageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="readerModeScreen"
          component={ReaderModeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="termsConditionScreen"
          component={TermsConditionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="channelScreen"
          component={ChannelScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="followChannelScreen"
          component={FollowChannelScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </NavigationProvider>
  );
};
const ReloadAppOnLanguageChange = withTranslation("translation", {
  bindI18n: "languageChanged",
  bindStore: false,
})(MainNavigation);

export default function App() {
  const [loaded] = useFonts({
    Regular: require("./assets/font/Mulish-Regular.ttf"),
    Medium: require("./assets/font/Mulish-Medium.ttf"),
    SemiBold: require("./assets/font/Mulish-SemiBold.ttf"),
    Bold: require("./assets/font/Mulish-Bold.ttf"),
    ExtraBold: require("./assets/font/Mulish-ExtraBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return <ReloadAppOnLanguageChange />;
}
