import AsyncStorage from '@react-native-async-storage/async-storage';

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
  if(!versionCur || !versionPlaystore) return;
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
