import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

export default function Loading({ message = 'Loading...' }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>{message}</Text>
    </View>
  );
}
