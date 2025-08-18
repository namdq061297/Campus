import React, { ReactNode, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { TextInputProps } from 'react-native-paper';
import COLORS from 'theme/colors';
import Block from './Block';

interface FormInputProps extends Omit<TextInputProps, 'label'> {
  label: string;
  errorMessage?: string;
  showError?: boolean;
  multiline?: boolean;
  rightComponent?: ReactNode;
  containerStyle?: ViewStyle;
  leftIcon?: string; // Tên icon Ionicons ở bên trái
  showPasswordToggle?: boolean; // Tự động toggle khi là password field
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChangeText,
  errorMessage,
  showError = false,
  leftIcon,
  showPasswordToggle = false,
  secureTextEntry = false,
  containerStyle,
  multiline = false,
  rightComponent,
  ...rest
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const [inputHeight, setInputHeight] = useState(0);
  const [rightCompWidth, setRightCompWidth] = useState(0);

  const renderRightIcon = () => {
    if (showPasswordToggle && secureTextEntry) {
      return (
        <TextInput.Icon
          icon={() => (
            <Ionicons
              name={hidePassword ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setHidePassword(!hidePassword)}
            />
          )}
        />
      );
    }
    return undefined;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        mode='outlined'
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={!!errorMessage && showError}
        activeOutlineColor={COLORS.green}
        secureTextEntry={hidePassword}
        outlineStyle={[{ borderRadius: 12 }, multiline && styles.multiline]}
        style={{ backgroundColor: COLORS.white, paddingRight: rightCompWidth }}
        onLayout={e => setInputHeight(e.nativeEvent.layout.height)}
        left={
          leftIcon ? (
            <TextInput.Icon icon={() => <Ionicons name={leftIcon} size={20} />} />
          ) : undefined
        }
        right={renderRightIcon()}
        {...rest}
      />
      {showError && errorMessage ? <HelperText type='error'>{errorMessage}</HelperText> : null}
      {rightComponent ? (
        <Block
          onLayout={e => setRightCompWidth(e.nativeEvent.layout.width)}
          position='absolute'
          top={inputHeight ? inputHeight / 2 - 2 : 0}
          right={16}
        >
          {rightComponent}
        </Block>
      ) : undefined}
    </View>
  );
};

export default React.memo(FormInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  multiline: {
    height: 100,
  },
});
