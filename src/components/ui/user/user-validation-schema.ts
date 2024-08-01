import * as yup from 'yup';
import { imageUrlRegExp, passwordRules, phoneRegExp } from '@/utils/constants';


export const userValidationSchema = yup.object().shape({
    name: yup.string().required('name required'),
    email: yup
        .string()
        .email('form:error-email-format')
        .required('form:error-email-required'),
    password: yup
        .string()
        .required('form:error-password-required')
        .matches(passwordRules, {
            message:
            'Please create a stronger password. hint: Min 8 characters, 1 Upper case letter, 1 Lower case letter, 1 Numeric digit.',
        }),
    imageUrl: yup
        .string()
        .url('Invalid URL format')
        .matches(imageUrlRegExp,'Image URL must end with .jpg, .jpeg, .png, .gif, .bmp, or .webp')
        .required('Image URL is required'),
    role: yup.string().required('Role is required'),
    phoneNumber: yup
          .string()
          .matches(phoneRegExp, 'Phone number must contain only digits')
          .min(10, 'Phone number must be at least 10 digits')
          .max(15, 'Phone number must be at most 15 digits')
          .required('Phone number is required'),
})