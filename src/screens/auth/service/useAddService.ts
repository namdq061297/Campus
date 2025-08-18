import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { AddServiceFormValues, addServiceSchema } from 'validattion/addService.schema';

const defaultValues: AddServiceFormValues = {
  serviceName: '',
  hour: '',
  minute: '',
  price: '',
  serviceColor: '',
  mediaUrl: '',
  staf: []
};

const useAddService = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<AddServiceFormValues>({
    resolver: yupResolver(addServiceSchema),
    defaultValues,
    mode: 'onTouched',
  });
  const dispatch = useDispatch();
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();
  const sheetRef = useRef<BottomSheetRef>(null);
  const serviceNameLength = watch('serviceName')?.length;

  const hasErrors = Object.keys(errors).length > 0;

  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState(false);
  const [showTooltipPopular, setShowTooltipPopular] = useState(false);

  const onSubmit = (data: any) => {
    console.warn('Form data:', data);
  };

  const updatePopular = useCallback(() => {
    setPopular((e) => !e)
  }, [])

  const updateTooltipPopular = useCallback(() => {
    setShowTooltipPopular((e) => !e)
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
    serviceNameLength,
    updatePopular,
    popular,
    updateTooltipPopular,
    showTooltipPopular
  };
};

export default useAddService;
