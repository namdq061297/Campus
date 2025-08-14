import React from 'react';
import { Controller } from 'react-hook-form';
import ScreenWrapper from 'components/ScreenWrapper';
import FormInput from 'components/FormInput';
import AppButton from 'components/AppButton';
import { useTranslation } from 'react-i18next';
import AppText from 'components/AppText';
import Block from 'components/Block';
import FastImage from 'react-native-fast-image';
import IMAGES from 'assets/images';
import COLORS from 'theme/colors';
import LinkButton from 'components/AppButtonLink';
import useForget from './useForget';
import { useStyleLogin } from '../login/styles';
import { goBack } from 'service/navigation-service';

const ForgetPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    isSubmitted,
    onSubmit,
  } = useForget();
  const { t } = useTranslation();
  const style = useStyleLogin();
  return (
    <ScreenWrapper backgroundColor={COLORS.background} scroll>
      <Block backgroundColor={COLORS.background} padding={16} flex={1} alignContent='center'>
        <FastImage style={style.logo} resizeMode="contain" source={IMAGES.logo} />
        <AppText fontWeight={'600'} textAlign='center' fontSize={32}>{t('forgot_y_pw')}</AppText>
        <Block height={32} />
        <Controller
          control={control}
          name="username"
          rules={{ required: 'Username is required' }}
          render={({ field: { onChange, value }, fieldState }) => (
            <FormInput
              label={t('username')}
              value={value}
              onChangeText={onChange}
              errorMessage={fieldState.error?.message}
              showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              leftIcon="person-outline"
            />
          )}
        />
        <LinkButton containerStyle={style.buttonFP} onPress={goBack}>
          {t('back_login')}
        </LinkButton>
        <Block height={32} />
        <AppButton title={t('submit')} onPress={handleSubmit(onSubmit)} />
      </Block>
    </ScreenWrapper>
  );
};

export default React.memo(ForgetPasswordScreen);
