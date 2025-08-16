// BottomSheet.tsx
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import AppText from './AppText';

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

export type BottomSheetProps = {
  children: React.ReactNode;
  headerTitle?: string;
  showClose?: boolean;
  snapPoints?: number[];
  overlayOpacity?: number;
  modalStyle?: ViewStyle;
  modalizeProps?: Partial<ModalizeProps>;
};

const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(({
  children,
  headerTitle,
  showClose = true,
  snapPoints,
  overlayOpacity = 0.5,
  modalStyle,
  modalizeProps = {},
}, ref) => {
  const modalRef = useRef<Modalize>(null);

  useImperativeHandle(ref, () => ({
    open: () => modalRef.current?.open(),
    close: () => modalRef.current?.close(),
  }), []);

  return (
    <Portal>
      <Modalize
        ref={modalRef}
        adjustToContentHeight={!snapPoints}
        snapPoint={snapPoints?.[0]}
        modalHeight={snapPoints?.[snapPoints.length - 1]}
        modalStyle={[styles.modal, modalStyle]}
        overlayStyle={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
        withOverlay
        withHandle={false}
        {...modalizeProps}
      >
        {/* Header */}
        {(headerTitle || showClose) && (
          <View style={styles.header}>
            <AppText textAlign="center" style={styles.title}>{headerTitle}</AppText>
            {showClose && (
              <TouchableOpacity style={styles.closeBtn} onPress={() => modalRef.current?.close()}>
                <AppText style={styles.closeText}>✕</AppText>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Nội dung */}
        <View style={styles.content}>
          {children}
        </View>
      </Modalize>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeText: {
    fontSize: 20,
    color: '#333',
  },
  content: {
    padding: 16,
  },
  closeBtn: {
    position: "absolute",
    right: 18
  }
});

export default BottomSheet;
