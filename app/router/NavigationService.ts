import {
  DrawerActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

const goBack = () => {
  navigationRef.dispatch(StackActions.pop());
};

const openDrawer = () => {
  navigationRef.dispatch(DrawerActions.openDrawer());
};

const closeDrawer = () => {
  navigationRef.dispatch(DrawerActions.closeDrawer());
};

const currentRoute = () => {
  const currentRouteObj = navigationRef.getCurrentRoute();
  if (currentRouteObj && currentRouteObj.name) {
    return currentRouteObj.name;
  }
};

export default {
  navigate,
  goBack,
  openDrawer,
  closeDrawer,
  currentRoute,
};
