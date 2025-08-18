// validation/addClient.schema.ts
import * as yup from 'yup';

export interface AddCategoryFormValues {
  category: string;
}

export const addCategorySchema: yup.ObjectSchema<AddCategoryFormValues> = yup
  .object({
    category: yup.string().trim().min(2, 'Category name must be at least 2 characters').required('Category name is required'),
  })
  .noUnknown();
