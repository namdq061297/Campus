import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Block from 'components/Block';
import AppText from 'components/AppText';
import { Controller } from 'react-hook-form';
import FormInput from 'components/FormInput';
import COLORS from 'theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetRef } from 'components/BottomSheetModalize';
import TypographyStyles from 'theme/TypographyStyles';

type Props = {
  categorySelected: any;
  onChangeCategory: any;
  categories: any[];
  control: any;
};

const CategoryComp = ({ categorySelected, onChangeCategory, categories, control }: Props) => {
  const { t } = useTranslation();
  const sheetRef = useRef<BottomSheetRef>(null);

  const openSheet = useCallback(() => {
    sheetRef.current?.open();
  }, []);

  const closeSheet = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const onPressCate = useCallback((item: any) => {
    onChangeCategory(item);
    closeSheet();
  }, []);

  return (
    <Block>
      <Controller
        control={control}
        name='serviceName'
        render={({ field: { onChange, value }, fieldState }) => (
          <FormInput
            label={t('category')}
            editable={false}
            value={categorySelected?.title}
            numberOfLines={1}
            onPressIn={openSheet}
            onChangeText={onChange}
            errorMessage={fieldState.error?.message}
            rightComponent={
              <Block flexDirection='row'>
                {categorySelected?.id && (
                  <Ionicons
                    name='close-outline'
                    onPress={() => onChangeCategory(undefined)}
                    size={18}
                  />
                )}

                <Block width={8} />
                <Ionicons name='chevron-down-outline' onPress={openSheet} size={18} />
              </Block>
            }
          />
        )}
      />
      <BottomSheet ref={sheetRef} headerTitle={t('category')} showClose>
        <Block paddingBottom={20}>
          {categories?.map(e => (
            <TouchableOpacity onPress={() => onPressCate(e)}>
              <Block
                flexDirection='row'
                justifyContent='space-between'
                backgroundColor={categorySelected?.id === e?.id ? COLORS.green_2 : COLORS.white}
                padding={8}
                borderBottomWidth={1}
                borderColor={COLORS.borderInput}
              >
                <AppText style={TypographyStyles.label}>{e?.title}</AppText>
                {categorySelected?.id === e?.id && (
                  <Ionicons
                    color={COLORS.green}
                    name='checkmark-done-outline'
                    onPress={() => {}}
                    size={18}
                  />
                )}
              </Block>
            </TouchableOpacity>
          ))}
        </Block>
      </BottomSheet>
    </Block>
  );
};
export default React.memo(CategoryComp);
