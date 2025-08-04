import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  uppercase?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  icon,
  variant = 'primary',
  fullWidth = true,
  uppercase = false,
  style,
  contentStyle,
  ...rest
}) => {
  const theme = useTheme();

  const isPrimary = variant === 'primary';

  const backgroundColor = isPrimary
    ? theme.colors.primary
    : theme.colors.surface;

  const textColor = isPrimary
    ? theme.colors.onPrimary
    : theme.colors.primary;

  return (
    <Button
      mode={isPrimary ? 'contained' : 'outlined'}
      icon={icon ? (props) => <Ionicons name={icon} {...props} /> : undefined}
      onPress={onPress}
      loading={loading}
      disabled={disabled || loading}
      contentStyle={[styles.content, fullWidth && styles.fullWidth, contentStyle]}
      style={[{ backgroundColor }, style, disabled && styles.disable]}
      labelStyle={[styles.label, { color: textColor }]}
      uppercase={uppercase}
      {...rest}
    >
      {title}
    </Button>
  );
};

export default React.memo(AppButton);

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  content: {
    height: 48,
  },
  label: {
    fontSize: 16,
  },
  disable: {
    opacity: 0.7,
  },
});
