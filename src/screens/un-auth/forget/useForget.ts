/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { loginApi } from '../../../api/client';
// import { login } from '../../../store/userSlice';
import { useForm } from 'react-hook-form';
import { useAlert } from 'components/AlertContext';
import { login } from 'store/userSlice';
import { useLoading } from 'components/LoadingContext';

const useForget = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      username: '',
    },
  });
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();


  const onSubmit = (data: any) => {
     dispatch(login(data));
    console.warn('Form data:', { token: '122112', username: data.userName });
  };

  return {
    onSubmit,
    handleSubmit,
    control,
    errors,
    isSubmitted
  };
};

export default useForget;
