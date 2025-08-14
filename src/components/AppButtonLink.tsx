import React from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
export type LinkButtonVariant = 'primary' | 'danger' | 'muted';
export type LinkButtonUnderline = 'always' | 'never' | 'auto';
export type LinkButtonSize = 'sm' | 'md' | 'lg';

export interface LinkButtonProps {
  children: React.ReactNode;

  // Hành vi
  onPress?: () => void | Promise<void>;
  onLongPress?: () => void;
  disabled?: boolean;
  loading?: boolean;

  // Điều hướng / Mở URL
  href?: string; // ví dụ: "https://example.com"
  navigateTo?: { name: string; params?: Record<string, any> }; // React Navigation

  // Trình bày
  variant?: LinkButtonVariant; // primary|danger|muted
  underline?: LinkButtonUnderline; // always|never|auto (auto: chỉ underline khi pressed)
  size?: LinkButtonSize; // sm|md|lg
  align?: 'left' | 'center' | 'right';

  // Icon
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;

  // Text props
  numberOfLines?: number;
  allowFontScaling?: boolean;

  // Style override (không inline trong component)
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;

  // Misc
  hitSlop?: number | { top: number; bottom: number; left: number; right: number };
  testID?: string;
  accessibilityLabel?: string;
}

const ANDROID_RIPPLE = { color: 'rgba(0,0,0,0.08)' };

export default function LinkButton({
  children,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  underline = 'always',
  size = 'md',
  align = 'left',
  iconLeft,
  iconRight,
  numberOfLines,
  allowFontScaling,
  containerStyle,
  textStyle,
  hitSlop,
  testID,
  accessibilityLabel,
}: LinkButtonProps) {

  const handlePress = async () => {
    if (disabled || loading) return;
    onPress && onPress()
  };

  const containerStyles = [
    styles.container,
    disabled && styles.containerDisabled,
    containerStyle,
  ];

  const textStyles = [
    styles.textBase,
    variant === 'primary' && styles.textPrimary,
    variant === 'danger' && styles.textDanger,
    variant === 'muted' && styles.textMuted,
    size === 'sm' && styles.textSm,
    size === 'md' && styles.textMd,
    size === 'lg' && styles.textLg,
    align === 'left' && styles.textAlignLeft,
    align === 'center' && styles.textAlignCenter,
    align === 'right' && styles.textAlignRight,
    disabled && styles.textDisabled,
    underline === 'always' && styles.textUnderline,
    underline === 'never' && styles.textNoUnderline,
    textStyle,
  ];

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled || loading}
      hitSlop={hitSlop ?? { top: 8, bottom: 8, left: 8, right: 8 }}
      android_ripple={Platform.OS === 'android' ? ANDROID_RIPPLE : undefined}
      style={({ pressed }) => [
        containerStyles,
        pressed && !disabled && styles.containerPressed,
      ]}
    >
      {({ pressed }) => (
        <View style={styles.row}>
          {iconLeft ? <View style={styles.iconLeft}>{iconLeft}</View> : null}
          <Text
            numberOfLines={numberOfLines}
            allowFontScaling={allowFontScaling}
            style={[
              textStyles,
              underline === 'auto' && (pressed ? styles.textUnderline : styles.textNoUnderline),
            ]}
          >
            {children}
          </Text>
          {loading ? (
            <ActivityIndicator style={styles.loading} />
          ) : (
            iconRight && <View style={styles.iconRight}>{iconRight}</View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  containerPressed: {
    opacity: 0.6,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBase: {
    textDecorationLine: 'underline', // default để tránh nhấp nháy; sẽ bị override bởi textNoUnderline
    fontWeight: '400',
  },
  textPrimary: { color: '#2563eb' }, // blue-600
  textDanger: { color: '#ef4444' },  // red-500
  textMuted: { color: '#64748b' },   // slate-500
  textDisabled: { color: '#9ca3af' }, // gray-400

  textSm: { fontSize: 13, lineHeight: 18 },
  textMd: { fontSize: 15, lineHeight: 20 },
  textLg: { fontSize: 17, lineHeight: 22 },

  textAlignLeft: { textAlign: 'left' },
  textAlignCenter: { textAlign: 'center' },
  textAlignRight: { textAlign: 'right' },

  textUnderline: { textDecorationLine: 'underline' },
  textNoUnderline: { textDecorationLine: 'none' },

  iconLeft: { marginRight: 6 },
  iconRight: { marginLeft: 6 },
  loading: { marginLeft: 8 },
});
