import React, { useImperativeHandle, useMemo, useRef, forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';

type Props = {
  title?: string;
  children?: React.ReactNode;
  /** Mặc định ['50%']; có thể là ['40%','80%'] hoặc [320] */
  snapPoints?: Array<string | number>;
  /** Style cho vùng content bên dưới header */
  contentContainerStyle?: ViewStyle;
  /** Gọi khi sheet đóng */
  onClose?: () => void;
} & Omit<BottomSheetModalProps, 'snapPoints' | 'children' | 'ref'>;

export type BottomSheetHandle = {
  open: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ title, children, snapPoints, contentContainerStyle, onClose, ...rest }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);

    const memoSnapPoints = useMemo(() => snapPoints ?? ['50%'], [snapPoints]);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (!modalRef.current) return;
        // log để chắc chắn hàm được gọi
        console.log('[BottomSheet] present()');
        requestAnimationFrame(() => {
          modalRef.current?.present();
        });
      },
      close: () => {
        if (!modalRef.current) return;
        modalRef.current?.dismiss();
      },
    }));


    return (
      <BottomSheetModal
        ref={modalRef}
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        onDismiss={onClose}
        backdropComponent={(p) => (
          <BottomSheetBackdrop
            {...p}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="close"
          />
        )}
        backgroundStyle={styles.bg}
        handleIndicatorStyle={styles.indicator}
        {...rest}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {title ?? ''}
          </Text>
          <Pressable
            onPress={() => modalRef.current?.dismiss()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Close bottom sheet"
            style={styles.closeBtn}
          >
            <Ionicons name="close" size={20} />
          </Pressable>
        </View>

        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  bg: {
    borderRadius: 16,
  },
  indicator: {
    backgroundColor: '#DADADA',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default BottomSheet;
