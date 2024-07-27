import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { roleValidationSchema } from "./role-validation-scheme";
import { getAuthCredentials } from "@/utils/auth-utils";
import { useCreateRoleMutation, useUpdateRoleMutation } from "@/data/role";
import Description from "../ui/description";
import Card from "../common/card";
import Input from "../ui/input";
import PageHeading from "../common/page-heading";
import SwitchInput from "../ui/switch-input";
import CheckboxInput from "../ui/checkbox-input";
import RolePermissionCard from "./role-permission-card";
import { rolePermissions } from "@/default-data/roles";

type FormValues = {
    name: string;
};

const RoleForm = ({ initialValues }: { initialValues?: any }) => {
    
    const { mutate: createRole, isLoading: creating } = useCreateRoleMutation();
    const { mutate: updateRole, isLoading: updating } = useUpdateRoleMutation();
    
    const { permissions } = getAuthCredentials();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch,
        setValue,
        control,
    } = useForm<FormValues>({
        ...(initialValues
            ? {
                defaultValues: {
                    ...initialValues,
                }
            }
            : {}),
            resolver: yupResolver(roleValidationSchema)
    });

    function onSubmit(values: FormValues) {
        if(initialValues) {
            updateRole({
                id: initialValues.id,
                ...values,
            });
        } else {
            createRole({
                ...values,
            })
        }
    }
    
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Title'}
                        details={'Add name of role from here'}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />
                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <Input
                            label={'Name'}
                            {...register('name')}
                            variant="outline"
                            className="mb-5"
                            error={errors.name?.message!}
                            required
                        />
                    </Card>
                </div>
                <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    <RolePermissionCard
                        control={control}
                        title={'Role Permission'}
                        name={'role-permission'}
                        permissionList={rolePermissions?.role}
                    />
                    <RolePermissionCard
                        control={control}
                        title={'User Permission'}
                        name={'user-permission'}
                        permissionList={rolePermissions?.user}
                    />
                </div>
            </form>
        </>
    )
}

export default RoleForm;