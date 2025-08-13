/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, setSessionFromStorage } from '../store/userSlice';
import { AppDispatch } from '../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from 'screens/auth/home/HomeScreen';
import LoginScreen from 'screens/un-auth/Login/LoginScreen';
import SettingsScreen from 'screens/auth/setting/SettingsScreen';
import Loading from 'components/Loading';
import { Pressable, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import COLORS from 'theme/colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const SplashScreen = () => <Loading message="Checking session..." />;

// --- Stack cho phần chưa đăng nhập ---
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AppDrawer() {
  const styles = StyleSheet.create({
    menuButton: {
      paddingHorizontal: 16,
    },
    menuIcon: {
      borderWidth: 1, borderColor: COLORS.green, borderRadius: 8, marginHorizontal: 10
    },
  });

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        drawerType: 'back',
        drawerActiveTintColor: COLORS.green,
        drawerInactiveTintColor: COLORS.gray,
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, ...styles.menuIcon })}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            {/* Dùng Ionicons */}
            <Ionicons color={COLORS.green} name="reorder-three-outline" size={28} />
            {/* Hoặc dùng ảnh tùy biến:
            <Image source={require('../assets/hamburger.png')} style={{ width: 24, height: 24 }} />
            */}
          </Pressable>
        ),
      })}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
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
  return !isLoggedIn ? <AppDrawer /> : <AuthStack />;
}
