import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Block from 'components/Block';
import AppText from 'components/AppText';
import { Controller } from 'react-hook-form';
import FormInput from 'components/FormInput';
import COLORS from 'theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';

type Props = {
  isSubmitted: boolean;
  popular: boolean;
  showTooltipService: boolean;
  serviceNameLength: number;
  showTooltipPopular: boolean;
  updatePopular: () => void;
  updateTooltipPopular: () => void;
  updateTooltipService: () => void;
  control: any;
}

const ServiceNameComp = ({
  control,
  isSubmitted,
  popular,
  updatePopular,
  serviceNameLength,
  showTooltipPopular,
  updateTooltipPopular,
  updateTooltipService,
  showTooltipService,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Block alignItems='center' justifyContent='space-between' flexDirection='row'>
        <Controller
          control={control}
          name='serviceName'
          render={({ field: { onChange, value }, fieldState }) => (
            <FormInput
              label={t('service_name')}
              maxLength={30}
              value={value}
              numberOfLines={1}
              onChangeText={onChange}
              errorMessage={fieldState.error?.message}
              containerStyle={{ width: '92%' }}
              showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
              rightComponent={
                <AppText color={COLORS.text_placeholder}>
                  {serviceNameLength?.toString() + '/30'}
                </AppText>
              }
            />
          )}
        />
        <Tooltip
          isVisible={showTooltipService}
          content={<AppText>{t('service_name_tooltip')}</AppText>}
          placement='bottom'
          onClose={updateTooltipService}
        >
          <TouchableOpacity onPress={updateTooltipService}>
            <Ionicons color={COLORS.light_gray} size={20} name={'help-circle-outline'} />
          </TouchableOpacity>
        </Tooltip>
      </Block>
      <Block flexDirection='row'>
        <TouchableOpacity onPress={updatePopular}>
          <Block alignItems='center' flexDirection='row'>
            <Ionicons
              color={popular ? COLORS.yellow : COLORS.black}
              size={18}
              name={popular ? 'star' : 'star-outline'}
            />
            <Block width={4} />
            <AppText>{t('popular_service')}</AppText>
            <Block width={4} />
          </Block>
        </TouchableOpacity>
        <Tooltip
          isVisible={showTooltipPopular}
          content={<AppText>{t('popular_tooltip')}</AppText>}
          placement='bottom'
          onClose={updateTooltipPopular}
        >
          <TouchableOpacity onPress={updateTooltipPopular}>
            <Ionicons color={COLORS.light_gray} size={20} name={'help-circle-outline'} />
          </TouchableOpacity>
        </Tooltip>
      </Block>
    </>
  );
};
export default React.memo(ServiceNameComp);
