import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { TextInputProps } from 'react-native-paper';
import COLORS from 'theme/colors';

interface FormInputProps extends Omit<TextInputProps, 'label'> {
  label: string;
  errorMessage?: string;
  showError?: boolean;
  multiline?: boolean;
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
  ...rest
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

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
        style={{ backgroundColor: COLORS.white }}
        left={
          leftIcon ? (
            <TextInput.Icon icon={() => <Ionicons name={leftIcon} size={20} />} />
          ) : undefined
        }
        right={renderRightIcon()}
        {...rest}
      />
      {showError && errorMessage ? (
        <HelperText type='error'>
          {errorMessage}
        </HelperText>
      ) : null}
    </View>
  );
};

export default React.memo(FormInput);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  multiline: {
    height: 100
  }
});
