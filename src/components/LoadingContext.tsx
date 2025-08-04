import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, ActivityIndicator } from 'react-native-paper';

type LoadingContextType = {
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const showLoading = useCallback(() => setVisible(true), []);
  const hideLoading = useCallback(() => setVisible(false), []);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading }}>
      <Portal>
        {visible && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" animating={true} color="#fff" />
          </View>
        )}
      </Portal>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});
