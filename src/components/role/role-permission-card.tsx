import { Control } from "react-hook-form";
import Card from "../common/card";
import PageHeading from "../common/page-heading";
import SwitchInput from "../ui/switch-input";
import CheckboxInput from "../ui/checkbox-input";

type FormValues = {
    name: string;
};

interface Props {
    control:  Control<FormValues>;
    title: string;
    name: string;
    permissionList: {
        title: string;
        name: string;
    }[]
}

const RolePermissionCard = ({
    control,
    title,
    name,
    permissionList,
} : Props ) => {
    return (
        <Card>
            <div className="mb-8 flex flex-col md:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/2">
                    <PageHeading title={title} />
                </div>
                <div className="ml-auto">
                    <SwitchInput
                        name={name}
                        control={control}
                        disabled={false}
                    />
                </div>
            </div>
            <div className="p-4 rounded">
                <ul className="list-disc list-outside space-y-2 text-gray-800 select-none">
                    {
                        permissionList?.map((permisssion,index)=>{
                            return (
                                <li className="font-medium" key={index}>
                                    <div className="flex justify-between">
                                        <span>{permisssion.title}</span>
                                        <CheckboxInput  name={permisssion.name}
                                            control={control}
                                            disabled={false}
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