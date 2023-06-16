import axios from "axios";
import config from '../config';
const { apiUrl } = config;
import { getUserProfile } from '../utils/index';

// USER API
export const saveUser = async (data) => {
  const url = `${apiUrl}/users`;
  const response = await axios.post(url, data);
  return response.data;
};

export const updateUser = async (data) => {
  try {
    const url = `${apiUrl}/users`;
    const response = await axios.put(url, data);
    return response.data;
  } catch (e) {
    console.log("Error in api update user:", e)
  }
};

export const getUser = async ({ mobile }) => {
  const source = axios.CancelToken.source();
  const url = `${apiUrl}/users?mobile=${mobile}`;
  let profile = await getUserProfile();
  const headers = { "mobile": profile?.mobile }
  const response = await axios.get(url, {
    cancelToken: source.token,
    headers
  });
  return response.data;
};
// USER API END

// NEWS API START
export const getNewsApi = async ({ prefNews, prefLanguage, newsType }) => {
  try {
    const source = axios.CancelToken.source();
    let profile = await getUserProfile();
    let profilePrefNews = (Array.isArray(profile?.prefNews)) ? profile?.prefNews.join(",") : profile?.prefNews
    let url = `${apiUrl}/news-api`;
    let prefLanguageParams = (prefLanguage || profile?.prefLanguage || 'english')
    let newsTypeParams = (newsType || 'swapable')
    let prefNewsParams = (prefNews || profilePrefNews || 'General')

    const response = await axios.get(url, {
      params: {
        prefLanguage: prefLanguageParams,
        newsType: newsTypeParams,
        prefNews: prefNewsParams
      }
    });
    return response.data;
  } catch (error) {
    console.log('Error in getNewsApi', error)
  }
};
// NEWS API END

// GET VERSION FOR APP UPDATE
export const getAppLatestVersion = async () => {
  try {
    const source = axios.CancelToken.source();
    const url = `${apiUrl}/version`;
    const response = await axios.get(url, { cancelToken: source.token });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Data fetching cancelled');
    } else {
      // Handle error
    }
  }
};
// END VERSION FOR APPUPDATE

// URL SHORT API
export const getShortUrl = async (longUrl ) => {
  const url = `${apiUrl}/short-url`;
  
  const response = await axios.get(url, {
    params: {
      url: longUrl
    }
  });

  return response?.data?.data;
};

// END URL SHORT API