/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { loginApi } from '../../../api/client';
// import { login } from '../../../store/userSlice';
import { useForm } from 'react-hook-form';
import { useAlert } from 'components/AlertContext';
import { login } from 'store/userSlice';
import { useLoading } from 'components/LoadingContext';
import { navigate } from 'service/navigation-service';
import { SCREEN_NAME } from 'navigation/screen';
import { AddClientFormValues, addClientSchema } from 'validattion/addClient.schema';
import { yupResolver } from '@hookform/resolvers/yup';

const defaultValues: AddClientFormValues = {
  fullname: '',
  email: '',
  phone: '',
  address: '',
  note: '',
};

const useClient = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<AddClientFormValues>({
    resolver: yupResolver(addClientSchema),
    defaultValues,
    mode: 'onTouched',
  });
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  const hasErrors = Object.keys(errors).length > 0;

  const goToFP = useCallback(() => {
    navigate(SCREEN_NAME.FORGET_PASSWORD)
  }, []);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.warn('Form data:', data);
  };

  return {
    loading,
    onSubmit,
    handleSubmit,
    control,
    errors,
    isSubmitted,
    goToFP,
    hasErrors
  };
};

export default useClient;
