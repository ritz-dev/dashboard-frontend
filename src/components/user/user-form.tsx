import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { userValidationSchema } from "./user-validation-schema";
import { useRegisterMutation } from "@/data/user";
import Card from "@/components/common/card";
import Input from "../ui/input";
import Description from "../ui/description";
import PhoneNumberInput from "../ui/phone-input";
import PasswordInput from "../ui/password-input";
import SelectInput from "../ui/select-input";
import FileInput from "../ui/file-input";
import StickyFooterPanel from "../ui/sticky-footer-panel";
import Button from "../ui/button";
import { Role, User } from "@/types";
import { useRolesQuery } from "@/data/role";
import { useMemo } from "react";

type FormValues = {
    name: string;
    email: string;
    password: string;
    imageUrl?: string | null;
    role: string;
    phoneNumber: string;
}

const DEFAULT_USER = {
    name: '',
    email: '',
    password: '',
    imageUrl: null,
    role: '',
    phoneNumber: '',
}

type IProps = {
    initialValues?: User | undefined;
}

const UserCreateForm = ({ initialValues }: IProps) => {

    const { mutate: registerUser, isLoading: creating} = useRegisterMutation();

    const methods= useForm<FormValues>({
        defaultValues: initialValues ? {

        }
        : DEFAULT_USER,
        resolver: yupResolver(userValidationSchema),
        shouldUnregister: true
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setError
    } = methods;

    const { roles, loading : rolesLoading } = useRolesQuery({
        limit:999,
    });

    const roleOptions = useMemo(() => {
        return roles.map((role : Role)=> {
            return {
                label: role.name,
                value: role.id,
            }
        })
    },[roles]);

    const onSubmit = async (values : FormValues) => {

        registerUser(
            values,
        )
    }
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Avatar'}
                        details={
                        <>
                            <span>Upload your profile image from here.</span><br/>
                            <span>Dimension of the avatar should be <span className="font-bold text-base">140 x 140px</span>.</span>
                        </>
                    }
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />

                    <Card className="w-full sm:w-8/12 md:w-2/3">
                        <FileInput name="imageUrl" control={control} multiple={false} />
                    </Card>
                </div>
                <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                    <Description
                        title={'Information'}
                        details={'Add your profile information from here'}
                        className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                    />
                    <Card className="w-full mb-5 sm:w-8/12 md:w-2/3">
                        <Input
                            label={('Name')}
                            {...register('name')}
                            error={(errors.name?.message!)}
                            variant="outline"
                            className="mb-5"
                            required
                        />
                        <Input
                            label={('Email')}
                            {...register('email')}
                            error={(errors.email?.message!)}
                            variant="outline"
                            className="mb-5"
                            required
                        />
                        <PasswordInput
                            label={('Password')}
                            {...register('password')}
                            variant="outline"
                            error={(errors.password?.message!)}
                            className="mb-5"
                            required
                        />
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <PhoneNumberInput
                                label={'Contact Number'}
                                {...register('phoneNumber')}
                                control={control}
                                className="sm:col-span-1"
                                required
                            />
                            <div className="sm:col-span-1">
                                <SelectInput
                                    label={('Select Role')}
                                    name={'role'}
                                    control={control}
                                    options={roleOptions}
                                    isLoading={rolesLoading}
                                    isClearable={true}
                                    required
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <StickyFooterPanel className="z-0">
                    <div className="mb-5 text-end">
                        <Button
                            loading={creating}
                            disabled={creating}
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

export default UserCreateForm;
