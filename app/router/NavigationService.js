import {
  DrawerActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const navigate = (name, params) => {
  // navigationRef.dispatch(navigationRef.navigate(name, params),)
  if (navigationRef.isReady()) {
    // @ts-ignore
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
  const cuurentRoute = navigationRef.getCurrentRoute();
  if (cuurentRoute.name) {
    return cuurentRoute.name;
  }
};

export default {
  navigate,
  goBack,
  openDrawer,
  closeDrawer,
  currentRoute,
};
