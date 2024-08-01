import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form"
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
import StickyFooterPanel from "../ui/sticky-footer-panel";
import Button from "../ui/button";

type FormValues = {
    name: string;
    permissions?: {name:string}[];
};

const RoleForm = ({ initialValues }: { initialValues?: any }) => {
    
    const { mutate: createRole, isLoading: creating } = useCreateRoleMutation();
    const { mutate: updateRole, isLoading: updating } = useUpdateRoleMutation();
    

    const DEFAULT_ROLE = initialValues ? initialValues : {
        name:'',
        permissions:[]
    }
    // const { permissions } = getAuthCredentials();
    
    const methods= useForm<FormValues>({
            defaultValues: {
                ...DEFAULT_ROLE,
            },
            resolver: yupResolver(roleValidationSchema)
    });

    const {handleSubmit, register, formState: { errors }} = methods;
    
    console.log(methods.watch());
    
    function onSubmit(values: FormValues) {

        console.log(values)

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
        <FormProvider {...methods}>
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
                        title={'Role Permission'}
                        permissionList={rolePermissions.filter(permission => permission.name.startsWith('role-'))}
                    />
                    <RolePermissionCard
                        title={'User Permission'}
                        permissionList={rolePermissions.filter(permission => permission.name.startsWith('user'))}
                    />
                </div>
                <StickyFooterPanel className="z-0">
                    <div className="text-end">
                        <Button
                            loading={creating || updating}
                            disabled={creating || updating}
                        >
                            {initialValues
                                ? ('Update')
                                : ('Save')}
                        </Button>
                    </div>
                </StickyFooterPanel>
            </form>
        </FormProvider>
    )
}

export default RoleForm;