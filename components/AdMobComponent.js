import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import 'expo-dev-client';
import { InterstitialAd, AdEventType, BannerAd, TestIds, BannerAdSize, AppOpenAd } from 'react-native-google-mobile-ads';
const { width } = Dimensions.get('window');
import config from '../config';

// AVAILABLE BANNERS
// {"ADAPTIVE_BANNER": "ADAPTIVE_BANNER", "ANCHORED_ADAPTIVE_BANNER": "ANCHORED_ADAPTIVE_BANNER", 
// "BANNER": "BANNER", "FULL_BANNER": "FULL_BANNER", "INLINE_ADAPTIVE_BANNER": "INLINE_ADAPTIVE_BANNER", "LARGE_BANNER": "LARGE_BANNER", "LEADERBOARD": "LEADERBOARD", "MEDIUM_RECTANGLE": "MEDIUM_RECTANGLE", "WIDE_SKYSCRAPER": "WIDE_SKYSCRAPER"}

const { banner, interstitial, openApp } = config.admobAds;
const interstitialAds = InterstitialAd.createForAdRequest(interstitial, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

export function BannerAds() {

  return (
    <BannerAd
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      unitId={banner}
      styles={{ width: width }}
    />
  );
}

export async function OpenApp() {

  const adUnitId = 'openApp';

  const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  // Preload an app open ad
  appOpenAd.load();

  // Show the app open ad when user brings the app to the foreground.
  appOpenAd.show();
}

export function InterstitialAds() {

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitialAds.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
      interstitialAds.show();
    });

    // Start loading the interstitialAds straight away
    interstitialAds.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  return null;
}
