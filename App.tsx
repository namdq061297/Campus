import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';

import { store, persistor } from './src/store';
import i18n from './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { AlertProvider } from './src/components/AlertContext';
import Loading from './src/components/Loading';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoadingProvider } from './src/components/LoadingContext';
import NavigationService, { navigationRef } from 'service/navigation-service';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host } from 'react-native-portalize';

export default function App() {
  return (
    <PaperProvider>
      <LoadingProvider>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <I18nextProvider i18n={i18n}>
              <AlertProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <Host>
                    <NavigationContainer
                      onReady={NavigationService.onReady}
                      onStateChange={NavigationService.onStateChange}
                      ref={navigationRef}
                    >
                      <AppNavigator />
                    </NavigationContainer>
                  </Host>
                </GestureHandlerRootView>
              </AlertProvider>
            </I18nextProvider>
          </PersistGate>
        </Provider>
      </LoadingProvider>
    </PaperProvider>
  );
}
