// validation/addClient.schema.ts
import * as yup from 'yup';

export interface AddClientFormValues {
  fullname: string;
  phone: string;
  email?: string;
  address?: string;
  note?: string;
  birthday?: string;
}

const emptyToUndef = (v: unknown) =>
  typeof v === 'string' && typeof v === 'string' && v.trim() === '' ? undefined : v;

const digitsOnly = (v: unknown) =>
  typeof v === 'string' ? v.replace(/\D/g, '') : v;

export const addClientSchema: yup.ObjectSchema<AddClientFormValues> = yup
  .object({
    fullname: yup.string().trim().min(2, 'Full name must be at least 2 characters').required('Full name is required'),
    phone: yup
      .string()
      .transform(digitsOnly)
      .matches(/^0\d{9,}$/, 'Phone must start with 0 and be at least 10 digits')
      .required('Phone is required'),
    email: yup.string().transform(emptyToUndef).email('Email is invalid').optional(),
    birthday: yup.string().transform(emptyToUndef).optional(),
    address: yup.string().transform(emptyToUndef).optional(),
    note: yup.string().transform(emptyToUndef).max(500, 'Note must be ≤ 500 characters').optional(),
  })
  .noUnknown();
