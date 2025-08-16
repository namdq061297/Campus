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
import { AddClientFormValues, addClientSchema } from 'validattion/addClient.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateData } from 'react-native-calendars';
import COLORS from 'theme/colors';
import { BottomSheetRef } from 'components/BottomSheetModalize';

const defaultValues: AddClientFormValues = {
  fullname: '',
  email: '',
  phone: '',
  address: '',
  note: '',
  birthday: '',
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
  const [selected, setSelected] = useState('');
  const sheetRef = useRef<BottomSheetRef>(null);

  const hasErrors = Object.keys(errors).length > 0;

  const goToFP = useCallback(() => {
    navigate(SCREEN_NAME.FORGET_PASSWORD)
  }, []);

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.warn('Form data:', data);
  };

  const onDayPress = useCallback((day: DateData) => {
    sheetRef?.current?.close()
    setSelected(day.dateString)
  }, []);

  const marked = useMemo(() => {
    return {
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: COLORS.green,
        selectedTextColor: COLORS.white
      }
    };
  }, [selected]);

  return {
    loading,
    onSubmit,
    handleSubmit,
    control,
    errors,
    isSubmitted,
    goToFP,
    onDayPress,
    hasErrors,
    marked,
    sheetRef
  };
};

export default useClient;
