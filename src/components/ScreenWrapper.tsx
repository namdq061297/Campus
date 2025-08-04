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
} from 'react-native';

type ScreenWrapperProps = {
  children: React.ReactNode;
  scroll?: boolean;
  backgroundColor?: string;
  contentContainerStyle?: any;
  statusBar?: StatusBarStyle; // 👈 khai báo kiểu đúng ở đây
};

const ScreenWrapper = ({
  children,
  scroll = false,
  backgroundColor = '#fff',
  contentContainerStyle = {},
  statusBar = 'light-content',
  ...rest
}: ScreenWrapperProps) => {
  const Container = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar barStyle={statusBar} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <Container
          style={[styles.flex, { backgroundColor }]}
          contentContainerStyle={scroll && [styles.container, contentContainerStyle]}
          {...rest}
        >
          {children}
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});

export default React.memo(ScreenWrapper);
