module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // 👈 Giúp bạn import từ src/
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // nên có
      },
    ],
    'react-native-reanimated/plugin', // giữ plugin này ở cuối
  ],
};
