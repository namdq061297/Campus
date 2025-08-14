/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, setSessionFromStorage } from '../store/userSlice';
import { AppDispatch } from '../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from 'screens/auth/home/HomeScreen';
import LoginScreen from 'screens/un-auth/login/LoginScreen';
import ForgetPasswordScreen from 'screens/un-auth/forget/ForgetPasswordScreen';
import SettingsScreen from 'screens/auth/setting/SettingsScreen';
import Loading from 'components/Loading';
import { Pressable, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import COLORS from 'theme/colors';

// 👇 IMPORT TYPES
import type { RootStackParamList, DrawerParamList } from './types';
import { SCREEN_NAME } from './screen';

// 👇 GẮN GENERICS
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const SplashScreen = () => <Loading message="Checking session..." />;

// --- Stack cho phần chưa đăng nhập ---
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREEN_NAME.SIGN_IN}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREEN_NAME.FORGET_PASSWORD}
        component={ForgetPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerType: 'back',
        drawerActiveTintColor: COLORS.green,
        drawerInactiveTintColor: COLORS.gray,
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={({ pressed }) => [styles.menuIcon, pressed && styles.menuIconPressed]}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Ionicons color={COLORS.green} name="reorder-three-outline" size={28} />
          </Pressable>
        ),
      })}
    >
      <Drawer.Screen
        name={SCREEN_NAME.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={SCREEN_NAME.SETTINGS}
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    dispatch(setSessionFromStorage()).finally(() => setChecking(false));
  }, [dispatch]);

  if (checking) return <SplashScreen />;

  // nếu đăng nhập -> vào Drawer, chưa đăng nhập -> vào Login
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // 👇 AppDrawer là một screen trong RootStack (đúng kiểu)
        <Stack.Screen name={SCREEN_NAME.APP_DRAWER} component={AppDrawer} />
      ) : (
        <Stack.Screen name={SCREEN_NAME.SIGN_IN} component={AuthStack} />
      )}
      {/* Nếu muốn truy cập ForgetPassword từ cả 2 nhánh, có thể thêm nó ở đây nữa */}
      {/* <Stack.Screen name={SCREEN_NAME.FORGET_PASSWORD} component={ForgetPasswordScreen} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  menuIconPressed: {
    opacity: 0.5,
  },
});
