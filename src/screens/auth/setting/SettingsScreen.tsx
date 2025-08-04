import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/userSlice';
import { useTranslation } from 'react-i18next';

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
