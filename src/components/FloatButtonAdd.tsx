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

const FloatButtonAdd = ({ onPress }: { onPress: () => void }) => {

  return (
    <Block
      alignItems='center'
      borderRadius={100}
      width={50}
      height={50}
      justifyContent='center'
      backgroundColor={COLORS.green}
      position='absolute'
      bottom={32}
      right={32}
      zIndex={999}
    >
      <TouchableOpacity onPress={onPress}>
        <Ionicons name='add-outline' size={32} color={COLORS.white} />
      </TouchableOpacity>
    </Block>
  );
};
export default React.memo(FloatButtonAdd);
