import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  // App stack chính
  AppDrawer: NavigatorScreenParams<DrawerParamList>;
  SignIn: undefined;
  ForgetPassword: undefined;
  // ...thêm các màn khác
};

export type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};
