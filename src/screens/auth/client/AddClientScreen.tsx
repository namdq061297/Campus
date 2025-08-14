/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Block from 'components/Block';
import ScreenWrapper from 'components/ScreenWrapper';
import AppButton from 'components/AppButton';
import { useLoading } from 'components/LoadingContext';
import { useAlert } from 'components/AlertContext';

const AddClientScreen = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();

  const { showAlert } = useAlert();

  return (
    <ScreenWrapper>
      <Block padding={16}>
        <AppButton icon="duplicate-outline" variant="primary" title={'alert'} onPress={() => {}} />
      </Block>
    </ScreenWrapper>
  );
}
export default React.memo(AddClientScreen);
