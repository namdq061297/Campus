import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from 'store/userSlice';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
}
