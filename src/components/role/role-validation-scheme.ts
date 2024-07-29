import * as yup from 'yup';

export const roleValidationSchema = yup.object().shape({
    name: yup.string().required('form:error-name-required'),
    rolePermissions: yup.array().of(yup.string()).min(1, 'form:error-permissions-required')
})