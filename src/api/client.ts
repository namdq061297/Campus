import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showAlertGlobal } from 'components/AlertContext';
import { Alert } from 'react-native';

const client = axios.create({
  baseURL: 'https://your-api.com/api',
  timeout: 10000,
});

// Request Interceptor
client.interceptors.request.use(
  async (config) => {
    // Ví dụ: thêm token nếu cần
    const token = await AsyncStorage.getItem('accessToken');; // từ redux hoặc storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || 'Có lỗi xảy ra';

    switch (status) {
      case 400:
        Alert.alert('Lỗi 400', message);
        break;
      case 401:
        showAlertGlobal({
          title: 'Phiên hết hạn',
          message: 'Vui lòng đăng nhập lại.',
        });
        // Optional: logout logic here
        break;
      case 403:
        Alert.alert('Không có quyền truy cập');
        break;
      case 500:
        Alert.alert('Lỗi hệ thống', 'Vui lòng thử lại sau');
        break;
      default:
        Alert.alert('Lỗi', message);
        break;
    }

    return Promise.reject(error);
  }
);

export default client;
