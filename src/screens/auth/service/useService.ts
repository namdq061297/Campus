/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { loginApi } from '../../../api/client';
// import { login } from '../../../store/userSlice';
import { useForm } from 'react-hook-form';
import { useAlert } from 'components/AlertContext';
import { login } from 'store/userSlice';
import { useLoading } from 'components/LoadingContext';
import { navigate } from 'service/navigation-service';
import { SCREEN_NAME } from 'navigation/screen';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateData } from 'react-native-calendars';
import COLORS from 'theme/colors';
import { BottomSheetRef } from 'components/BottomSheetModalize';
import { AddCategoryFormValues, addCategorySchema } from 'validattion/addCategory';

const defaultValues: AddCategoryFormValues = {
  category: '',
};

const useClient = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<AddCategoryFormValues>({
    resolver: yupResolver(addCategorySchema),
    defaultValues,
    mode: 'onTouched',
  });
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();
  const [selected, setSelected] = useState('');
  const sheetRef = useRef<BottomSheetRef>(null);
  const categoryNameLength = watch('category')?.length;

  const hasErrors = Object.keys(errors).length > 0;

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.warn('Form data:', data);
  }

  const openSheet = useCallback(() => {
    sheetRef.current?.open()
  }, [])

  const closeSheet = useCallback(() => {
    sheetRef.current?.close()
  }, [])

  const onPressFloatItem = useCallback((name: string) => {
    if (name === 'new_cate') {
      openSheet()
    }
  }, [])


  return {
    loading,
    onSubmit,
    handleSubmit,
    control,
    errors,
    isSubmitted,
    hasErrors,
    sheetRef,
    openSheet,
    onPressFloatItem,
    closeSheet,
    categoryNameLength
  };
};

export default useClient;
