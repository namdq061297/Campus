/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Block from 'components/Block';
import ScreenWrapper from 'components/ScreenWrapper';
import AppButton from 'components/AppButton';
import { useLoading } from 'components/LoadingContext';
import { useAlert } from 'components/AlertContext';
import IMAGES from 'assets/images';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from 'theme/colors';
import FloatButtonAdd from 'components/FloatButtonAdd';
import { navigate } from 'service/navigation-service';
import { SCREEN_NAME } from 'navigation/screen';

const ClientsScreen = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

  const { showAlert } = useAlert();

  return (
    <ScreenWrapper>
      <Block padding={16}></Block>
      {/* <FloatButtonAdd onPress={() => navigate(SCREEN_NAME.ADD_CLIENT)} /> */}
      <FloatButtonAdd onPress={() => navigate(SCREEN_NAME.ADD_CLIENT)} />
    </ScreenWrapper>
  );
};
export default React.memo(ClientsScreen);
