import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  StatusBarStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import COLORS from 'theme/colors';
import AppHeader, { HeaderProps } from './AppHeader';
import { useTranslation } from 'react-i18next';

type ScreenWrapperProps = {
  children: React.ReactNode;
  scroll?: boolean;
  backgroundColor?: string;
  contentContainerStyle?: any;
  statusBar?: StatusBarStyle;
  dismissOnTouchOutside?: boolean;
  /** Cho phép override offset nếu cần tinh chỉnh thêm */
  keyboardVerticalOffset?: number;
  /** Nếu false, bỏ cộng headerHeight (ví dụ màn không có header) */
  useHeaderOffset?: boolean;
  showHeader?: boolean;
} & HeaderProps;

const ScreenWrapper = ({
  children,
  scroll = false,
  backgroundColor = COLORS.white,
  contentContainerStyle = {},
  statusBar = 'default',
  dismissOnTouchOutside = true,
  keyboardVerticalOffset,
  useHeaderOffset = true,
  showHeader = true,
  title = '',
  ...rest
}: ScreenWrapperProps) => {
  const Container: any = scroll ? ScrollView : View;

  const headerHeight = useHeaderOffset ? useHeaderHeight() : 0;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  // Tính offset chuẩn cho iOS; Android thường dựa vào adjustResize
  const computedOffset =
    Platform.OS === 'ios'
      ? (keyboardVerticalOffset ?? headerHeight) + (insets?.top ?? 0)
      : keyboardVerticalOffset ?? 0;

  const body = (
    <Container
      style={[styles.flex, { backgroundColor }]}
      {...(scroll
        ? {
          keyboardShouldPersistTaps: 'handled',
          keyboardDismissMode: Platform.OS === 'ios' ? 'on-drag' : 'none',
          contentContainerStyle: [styles.container, contentContainerStyle],
        }
        : {})}
      {...rest}
    >
      {children}
    </Container>
  );

  const content = dismissOnTouchOutside ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.flex}>{body}</View>
    </TouchableWithoutFeedback>
  ) : (
    body
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle={statusBar} />
      {showHeader && <AppHeader title={title} />}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={computedOffset}
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1 },
  container: { flexGrow: 1 },
});

export default React.memo(ScreenWrapper);
