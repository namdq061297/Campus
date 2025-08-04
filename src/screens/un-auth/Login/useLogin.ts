/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAlert } from '../../../components/AlertContext';
// import { loginApi } from '../../../api/client';
// import { login } from '../../../store/userSlice';
import { useForm } from 'react-hook-form';
import userSlice, { login } from '../../../store/userSlice';

const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  useEffect(() => {
    console.log('✅ useEffect triggered');
  }, []);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
     dispatch(login(data));
    console.warn('Form data:', { token: '122112', username: data.userName });
    // gọi API login ở đây
  };

  return {
    loading,
    onSubmit,
    handleSubmit,
    control,
    errors,
    isSubmitted
  };
};

export default useLogin;
