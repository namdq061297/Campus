import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Block from 'components/Block';
import ScreenWrapper from 'components/ScreenWrapper';
import AppButton from 'components/AppButton';
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
import ServiceNameComp from './components/ServiceNameComp';
import CategoryComp from './components/CategoryComp';

const AddServiceScreen = () => {
  const { t } = useTranslation();
  // const { showLoading, hideLoading } = useLoading();

  // const { showAlert } = useAlert();
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
    updateTooltipPopular,
    updateTooltipService,
    showTooltipService,
    setCateSelected,
    cateSelected,
    categories
  } = useAddService();

  const openSheet = useCallback(() => {
    sheetRef.current?.open();
  }, []);

  return (
    <ScreenWrapper title={t('add_service')} scroll>
      <Block padding={16}>
        <AppText style={TypographyStyles.titleMedium}>{t('service_detail')}</AppText>
        <Block marginTop={16}>
          <ServiceNameComp
            serviceNameLength={serviceNameLength}
            showTooltipPopular={showTooltipPopular}
            updatePopular={updatePopular}
            isSubmitted={isSubmitted}
            popular={popular}
            control={control}
            updateTooltipPopular={updateTooltipPopular}
            showTooltipService={showTooltipService}
            updateTooltipService={updateTooltipService}
          />
          <Block height={16} />
          <CategoryComp categorySelected={cateSelected} onChangeCategory={setCateSelected} categories={categories} control={control} />
          <AppButton disabled={hasErrors} title={t('btn_save')} onPress={handleSubmit(onSubmit)} />
          <Block height={16} />
          <AppButton variant='secondary' title={t('btn_save_and_add_new')} onPress={openSheet} />
        </Block>
      </Block>
      <BottomSheet ref={sheetRef} headerTitle={t('birthday')} showClose snapPoints={[500, 700]}>
        <></>
      </BottomSheet>
    </ScreenWrapper>
  );
};
export default React.memo(AddServiceScreen);
