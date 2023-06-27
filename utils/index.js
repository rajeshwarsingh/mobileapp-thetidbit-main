import AsyncStorage from '@react-native-async-storage/async-storage';

let chacheSwap = "chache-swap";

export const getUserProfile = async () => {
  try {
    let userData = await AsyncStorage.getItem('userDetails');
    userData = JSON.parse(userData)
    return userData
  } catch (e) {
    return {};
  }
}

export function compareAppVersions(versionCur, versionPlaystore) {
  if (!versionCur || !versionPlaystore) return;
  const components1 = versionCur.split('.').map(Number);
  const components2 = versionPlaystore.split('.').map(Number);

  for (let i = 0; i < Math.max(components1.length, components2.length); i++) {
    const component1 = components1[i] || 0;
    const component2 = components2[i] || 0;

    if (component1 < component2) {
      return -1; // versionCur is lower
    } else if (component1 > component2) {
      return 1; // versionCur is higher
    }
  }

  return 0; // versions are equal
}

export const getSwapNewsCacheData = async () => {
  try {
    let userData = await AsyncStorage.getItem(chacheSwap);
    userData = JSON.parse(userData);
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@7",userData,"@@@@@@@@@@7")
    return userData
  } catch (e) {
    console.log("Error in storing swap cache data in local storage:", e)
    return {};
  }
}

export const updateSwapNewsCacheData = async (data = {}) => {
  try {
  if(typeof data === 'object') data = JSON.stringify(data);
    await AsyncStorage.setItem(chacheSwap, data);
    return "success"
  } catch (e) {
    console.log("Error in storing swap cache data in local storage:", e)
    return {};
  }
} 


export const logOutput = ({msg, functionName})=>{
  // console.log(`${functionName} : ${msg}`)
} 