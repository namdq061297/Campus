import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import COLORS from 'theme/colors';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'text';
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
    ? COLORS.green
    : theme.colors.inverseOnSurface;

  const textColor = isPrimary
    ? theme.colors.onPrimary
    : theme.colors.inverseSurface;

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
    fontWeight: '600'
  },
  disable: {
    opacity: 0.7,
  },
});
