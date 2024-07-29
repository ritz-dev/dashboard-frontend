import Card from "../common/card";
import PageHeading from "../common/page-heading";
import SwitchInput from "../ui/switch-input";
import CheckboxInput from "../ui/checkbox-input";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Switch } from "@headlessui/react";


interface Props {
    title: string;
    name: string;
    permissionList: {
        label: string;
        name: string;
    }[]
}

const RolePermissionCard = ({
    title,
    name,
    permissionList,
} : Props ) => {

    const { getValues, setValue, control } = useFormContext();
    const [isAllChecked, setIsAllChecked] = useState(false);

    const permissionsGroup = useWatch({
        name: `permissions`,
        control
    });

    useEffect(()=> {

        if(permissionsGroup?.[name] !== undefined){
            const allChecked = Object.values(permissionsGroup?.[name]).every((permission) => permission === true);
            setIsAllChecked(allChecked);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [permissionsGroup]);

    const handelToggleAll = (checked : boolean) => {

        const permissions = getValues('permissions');
        const newPermissions = { ...permissions};

        if(newPermissions[name] != undefined){
            permissionList.forEach(permission => {
                newPermissions[name][permission.name] = checked;
            });

            setValue(`permissions`, newPermissions);

            setIsAllChecked(prev => !prev);
        }
    };

    return (
        <Card>
            <div className="mb-8 flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/2">
                    <PageHeading title={title} />
                </div>
                <div className="ml-auto">
                    <Switch
                        checked={isAllChecked}
                        onChange={(checked) => handelToggleAll(checked)}
                        disabled={false}
                        className={`${
                            isAllChecked ? 'bg-accent' : 'bg-gray-300'
                        } relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none ${
                            false ? 'cursor-not-allowed bg-[#EEF1F4]' : ''
                        }`}
                        id={name}
                    >
                        <span className="sr-only">Enable</span>
                            <span
                                className={`${
                                    isAllChecked ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-light transition-transform`}
                            />
                    </Switch>
                </div>
            </div>
            <div className="p-4 rounded">
                <ul className="list-disc list-outside space-y-2 text-gray-800 select-none">
                    {
                        permissionList?.map((permission,index)=>{
                            return (
                                <li className="font-medium" key={index}>
                                    <div className="flex justify-between">
                                        <span>{permission.label}</span>
                                        <CheckboxInput
                                            name={`permissions.${name}.${permission.name}`}
                                            value={permissionsGroup?.[name][permission.name]}
                                        />
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>                            
        </Card>
    )
}

export default RolePermissionCard;