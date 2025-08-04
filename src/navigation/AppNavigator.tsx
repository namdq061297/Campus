import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import SettingsScreen from '../screens/auth/setting/SettingsScreen';
import { selectIsLoggedIn, setSessionFromStorage } from '../store/userSlice';
import Loading from '../components/Loading';
import { AppDispatch } from '../store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/un-auth/Login/LoginScreen';
import HomeScreen from '../screens/auth/home/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SplashScreen = () => <Loading message="Checking session..." />;

export default function AppNavigator() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch<AppDispatch>();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    dispatch(setSessionFromStorage()).finally(() => setChecking(false));
  }, [dispatch]);

  if (checking) return <SplashScreen />;

  if (!isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator screenOptions={{
        headerShown: false, // 👈 Disable toàn bộ header mặc định
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
