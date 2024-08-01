import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "./user-validation-schema";
import { Routes } from "@/config/routes";
import { useRegisterMutation } from "@/data/user";
import Card from "@/components/common/card";
import Input from "../input";
import Button from "../button";
import Description from "../description";
import PhoneNumberInput from "../phone-input";
import PasswordInput from "../password-input";
import SelectInput from "../select-input";

type FormValues = {
    name: string;
    email: string;
    password: string;
    imageUrl: string;
    role: string;
    phoneNumber: string;
}

const defaultValues = {
    name: '',
    email: '',
    password: '',
    imageUrl: '',
    role: '',
    phoneNumber: '',
}

const UserCreateForm = () => {
    const router = useRouter();
    const { mutate: registerUser, isLoading: loading} = useRegisterMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        control
    } = useForm<FormValues>({
        defaultValues,
        resolver: yupResolver(userValidationSchema)
    })
    
    async function onSubmit(user : FormValues) {
        registerUser(
            user,
            {
                onError: (error: any) => {
                  Object.keys(error?.response?.data).forEach((field: any) => {
                    setError(field, {
                      type: 'manual',
                      message: error?.response?.data[field][0],
                    });
                  });
                },
                onSuccess: (data: any) => {
                  if (data) {
                    router.push(Routes.user.list);
                  }
                },
              }
        )
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
                <Description
                title={'Avatar'}
                details={'Upload your profile image from here. Dimension of the avatar should be 140 x 140px'}
                className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="profile.avatar" control={control} multiple={false} />
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
                        // error={t(errors.name?.message!)}
                        variant="outline"
                        className="mb-5"
                    />
                    <Input
                        label={('Email')}
                        {...register('email')}
                        // error={`${errors.email?.message!}`}
                        variant="outline"
                        className="mb-5"
                    />
                    <PasswordInput
                        label={('New Password')}
                        {...register('password')}
                        variant="outline"
                        error={undefined}
                        className="mb-5"
                    />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <PhoneNumberInput
                            label={'Contact Number'}
                            {...register('phoneNumber')}
                            control={control}
                            error={undefined}
                            className="sm:col-span-1"
                        />
                        <div className="sm:col-span-1">
                            <SelectInput
                                label={('Select Role')}
                                name={'role'}
                                control={control}
                                options={[
                                    {
                                        label: 'Manager',
                                        value: 'Manager'
                                    },
                                    {
                                        label: 'Supervisor',
                                        value: 'Supervisor'
                                    }
                                ]}
                            isClearable={true}
                            />
                        </div>
                        
                    </div>
                    
                    
                </Card>
            </div>
        </form>
    )
}

export default UserCreateForm;

{/* <div className="text-end w-full">
                    <Button loading={loading} disabled={loading}>
                        {t('form:button-label-save')}
                    </Button>
                </div> */}