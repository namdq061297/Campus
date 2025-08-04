import React from 'react';
import { Text, Button, ActivityIndicator } from 'react-native';
import ScreenWrapper from '../../../components/ScreenWrapper';
import useLogin from './useLogin';
import FormInput from '../../../components/FormInput';
import { Controller } from 'react-hook-form';

const LoginScreen = () => {
  const {
    control,
    loading,
    handleSubmit,
    isSubmitted,
    onSubmit,
  } = useLogin();

  return (
    <ScreenWrapper scroll>
      <Text style={{ fontSize: 22, marginBottom: 16 }}>Login</Text>

       <Controller
        control={control}
        name="username"
        rules={{ required: 'Username is required' }}
        render={({ field: { onChange, value }, fieldState }) => (
          <FormInput
            label="Username"
            value={value}
            onChangeText={onChange}
            errorMessage={fieldState.error?.message}
            showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
            leftIcon="person-outline"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
        render={({ field: { onChange, value }, fieldState }) => (
          <FormInput
            label="Password"
            value={value}
            onChangeText={onChange}
            errorMessage={fieldState.error?.message}
            showError={fieldState.invalid && (fieldState.isTouched || isSubmitted)}
            secureTextEntry
            showPasswordToggle
            leftIcon="lock-open-outline"
          />
        )}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
       <Button title="Login" onPress={handleSubmit(onSubmit)} />
      )}
    </ScreenWrapper>
  );
};

export default React.memo(LoginScreen);
