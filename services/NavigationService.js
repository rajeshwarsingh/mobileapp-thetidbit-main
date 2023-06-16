import { CommonActions, useNavigation } from '@react-navigation/native';

let navigationRef;

export function setNavigationRef(ref) {
  navigationRef = ref;
}

export function navigate(routeName, params) {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    })
  );
}

export function useNavigationService() {
  return useNavigation(navigationRef);
}

export default {
  setNavigationRef,
  navigate,
  useNavigationService,
};