/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from 'react';
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
import { FloatingAction } from "react-native-floating-action";
import AppText from 'components/AppText';
import useService from './useService';
import BottomSheet from 'components/BottomSheetModalize';
import { Controller } from 'react-hook-form';
import FormInput from 'components/FormInput';

const ClientsScreen = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const {
    control,
    handleSubmit,
    isSubmitted,
    onSubmit,
    hasErrors,
    sheetRef,
    closeSheet,
    onPressFloatItem,
    categoryNameLength
  } = useService();
  const { showAlert } = useAlert();

  const actions = [
    {
      text: t('new_service'),
      icon: <Ionicons name="add" size={24} color={COLORS.white} />,
      name: "new_service",
      position: 1,
      color: COLORS.green_1
    },
    {
      text: t('new_cate'),
      icon: <Ionicons name="add" size={24} color={COLORS.white} />,
      name: "new_cate",
      position: 2,
      color: COLORS.green_2
    },
  ]

  return (
    <ScreenWrapper showHeader={false}>
      <Block padding={16}>
        <AppText>service_cate</AppText>
      </Block>
      <FloatingAction
        color={COLORS.green}
        actions={actions}
        buttonSize={50}
        onPressItem={name => onPressFloatItem(name as string)}
      />
      <BottomSheet
        ref={sheetRef}
        headerTitle={t('new_cate')}
        showClose
        snapPoints={[250]}
      >
        <Controller
          control={control}
          name="category"
          // rules={{  }}
          render={({ field: { onChange, value }, fieldState }) => (
            <FormInput
              label={t('cate_name')}
              value={value}
              onChangeText={onChange}
              maxLength={30}
              errorMessage={fieldState.error?.message}
              showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              rightComponent={(
                <AppText color={COLORS.text_placeholder}>{categoryNameLength?.toString() + '/30'}</AppText>
              )}
            />
          )}
        />
        <Block marginTop={16} justifyContent="space-between" flexDirection="row">
          <AppButton variant='secondary' style={{ width: '48%' }} fullWidth={false} disabled={hasErrors} title={t('cancel')} onPress={closeSheet} />
          <AppButton style={{ width: '48%' }} fullWidth={false} title={t('save')} onPress={handleSubmit(onSubmit)} />
        </Block>
      </BottomSheet>
    </ScreenWrapper>
  );
};
export default React.memo(ClientsScreen);
