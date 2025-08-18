// validation/addClient.schema.ts
import * as yup from 'yup';

export interface AddServiceFormValues {
  serviceName: string;
  hour: string;
  minute: string;
  price: string;
  serviceColor: string;
  mediaUrl: string;
  staf: any[];
}

export const addServiceSchema: yup.ObjectSchema<AddServiceFormValues> = yup
  .object({
    serviceName: yup.string().trim().min(2, 'Service name must be at least 2 characters').required('Service name is required'),
    hour: yup
      .string()
      .required('Phone is required'),
    minutre: yup
      .string()
      .required('Phone is required'),
    minute: yup.string().required('Phone is required'),
    price: yup.string().required('Phone is required'),
    serviceColor: yup.string().required('Phone is required'),
    mediaUrl: yup.string().required('Phone is required'),
    staf: yup.array()
      .min(1, 'Select at lease 1 staff')
      .required('Staff is required'),
  })
  .noUnknown();
