import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
  const setItem = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error('SetItem Error:', e);
    }
  };

  const getItem = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      console.error('GetItem Error:', e);
      return null;
    }
  };

  const removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('RemoveItem Error:', e);
    }
  };

  return { setItem, getItem, removeItem };
};

export default useStorage;
