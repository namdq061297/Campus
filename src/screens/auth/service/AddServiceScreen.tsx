import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Block from 'components/Block';
import ScreenWrapper from 'components/ScreenWrapper';
import AppButton from 'components/AppButton';
import { useLoading } from 'components/LoadingContext';
import { useAlert } from 'components/AlertContext';
import AppText from 'components/AppText';
import TypographyStyles from 'theme/TypographyStyles';
import { Controller } from 'react-hook-form';
import FormInput from 'components/FormInput';
import BottomSheet from 'components/BottomSheetModalize';
import useAddService from './useAddService';
import COLORS from 'theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

const AddServiceScreen = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    isSubmitted,
    onSubmit,
    hasErrors,
    sheetRef,
    popular,
    updatePopular,
    serviceNameLength,
    showTooltipPopular,
    updateTooltipPopular
  } = useAddService();

  const openSheet = useCallback(() => {
    sheetRef.current?.open()
  }, [])

  return (
    <ScreenWrapper title={t('add_service')} scroll>
      <Block padding={16}>
        <AppText style={TypographyStyles.titleMedium}>{t('service_detail')}</AppText>
        <Block marginTop={16}>
          <Controller
            control={control}
            name="serviceName"
            render={({ field: { onChange, value }, fieldState }) => (
              <FormInput
                label={t('service_name')}
                maxLength={30}
                value={value}
                numberOfLines={1}
                onChangeText={onChange}
                errorMessage={fieldState.error?.message}
                showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
                rightComponent={(
                  <AppText color={COLORS.text_placeholder}>{serviceNameLength?.toString() + '/30'}</AppText>
                )}
              />
            )}
          />
          <Block flexDirection="row">
            <TouchableOpacity onPress={updatePopular}>
              <Block alignItems="center" flexDirection="row">
                <Ionicons color={popular ? COLORS.yellow : COLORS.black} size={18} name={popular ? 'star' : 'star-outline'} />
                <Block width={4} />
                <AppText>{t('popular_service')}</AppText>
                <Block width={4} />
              </Block>
            </TouchableOpacity>
            <Tooltip
              isVisible={showTooltipPopular}
              content={<AppText>{t('popular_tooltip')}</AppText>}
              placement="bottom"
              onClose={updateTooltipPopular}
            >
              <TouchableOpacity onPress={updateTooltipPopular}>
                <Ionicons color={COLORS.light_gray} size={20} name={'help-circle-outline'} />
              </TouchableOpacity>
            </Tooltip>
          </Block>
          <Block height={16} />
          <AppButton disabled={hasErrors} title={t('btn_save')} onPress={handleSubmit(onSubmit)} />
          <Block height={16} />
          <AppButton variant="secondary" title={t('btn_save_and_add_new')} onPress={openSheet} />
        </Block>
      </Block>
      <BottomSheet
        ref={sheetRef}
        headerTitle={t('birthday')}
        showClose
        snapPoints={[500, 700]}
      >
        <></>
      </BottomSheet>
    </ScreenWrapper>
  );
};
export default React.memo(AddServiceScreen);
