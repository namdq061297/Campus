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
import AppHeader from 'components/AppHeader';
import AppText from 'components/AppText';
import TypographyStyles from 'theme/TypographyStyles';
import { Controller } from 'react-hook-form';
import useClient from './useClient';
import FormInput from 'components/FormInput';

const AddClientScreen = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    isSubmitted,
    onSubmit,
    hasErrors,
  } = useClient();

  return (
    <ScreenWrapper>
      <AppHeader title={t('add_client')} />
      <Block padding={16}>
        <AppText style={TypographyStyles.titleMedium}>{t('general_information')}</AppText>
        <Block marginTop={16}>
          <Controller
            control={control}
            name="fullname"
            rules={{ required: 'Fullname is required' }}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormInput
                label={t('full_name')}
                maxLength={50}
                value={value}
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            // rules={{  }}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormInput
                label={t('email_optional')}
                value={value}
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            // rules={{  }}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormInput
                label={t('phone_number')}
                value={value}
                maxLength={12}
                keyboardType="phone-pad"
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              />
            )}
          />
          <AppText style={TypographyStyles.titleMedium}>{t('about_client_optional')}</AppText>
          <Block height={16} />
          <Controller
            control={control}
            name="address"
            // rules={{  }}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormInput
                label={t('address')}
                value={value}
                maxLength={100}
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              />
            )}
          />
          <Controller
            control={control}
            name="note"
            // rules={{  }}
            render={({ field: { onChange, value }, fieldState }) => (
              <FormInput
                label={t('note')}
                maxLength={100}
                multiline
                value={value}
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              />
            )}
          />
        </Block>
        <Block height={72} />
        <AppButton disabled={hasErrors} title={t('btn_save')} onPress={handleSubmit(onSubmit)} />
        <Block height={24} />
        <AppButton disabled={hasErrors} variant="secondary" title={t('btn_save_and_add_new')} onPress={handleSubmit(onSubmit)} />
      </Block>
    </ScreenWrapper>
  );
};
export default React.memo(AddClientScreen);
