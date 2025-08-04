import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import AppHeader from '../../../components/AppHeader';
import AppButton from '../../../components/AppButton';
import { useLoading } from '../../../components/LoadingContext';
// import { useAlert } from '../components/AlertContext';

const HomeScreen = () => {
  const { t } = useTranslation();
    const { showLoading, hideLoading } = useLoading();

  // const toggleLang = () => {
  //   const nextLang = i18n.language === 'en' ? 'vi' : 'en';
  //   i18n.changeLanguage(nextLang);
  // };
  // const { showAlert } = useAlert();

   const onPressAlert = () => {
    // showAlert({
    //   title: '1212',
    //   message: '090909'
    // });
    showLoading();
    setTimeout(() => {
      hideLoading()
    }, 2000);
  };

  return (
    <ScreenWrapper>
      <AppHeader
        title="Home"
        showBack
        // rightIcon="settings-outline"
        // onRightPress={() => navigation.navigate('Settings')}
      />
      <Text>{t('hello')}</Text>
      <AppButton icon="duplicate-outline" variant="primary" title={'alert'} onPress={onPressAlert} />
    </ScreenWrapper>
  );
}
export default React.memo(HomeScreen);
