import Link from "next/link";
import { EditIcon } from "../icons/edit copy";
import { useModalAction } from "../ui/modal/modal.context";
import { TrashIcon } from "../icons/trash";
import { EyeIcon } from "../icons/category/eyes-icon";

type Props = {
    id: string;
    editModalView?: string | any;
    deleteModalView?: string | any;
    editUrl?: string;
    previewUrl?: string;
    enablePreviewMode?: boolean;
}

const ActionButtons = ({
    id,
    editModalView,
    deleteModalView,
    editUrl,
    previewUrl,
    enablePreviewMode = false,
}: Props) => {

    const { openModal } = useModalAction();

    function handleDelete() {
        openModal(deleteModalView, id);
    }

    function handleEditModel() {
        openModal(editModalView, id);
    }

    return (
        <div className="inline-flex items-center w-auto gap-3">
            {editModalView && (
                    <button
                        onClick={handleEditModel}
                        className="transition duration-200 text-body hover:text-heading focus:outline"
                        title={('Edit')}
                    >
                        <EditIcon width={16} />
                    </button>
                )
            }
            {editUrl && (
                    <Link
                        href={editUrl}
                        className="text-base transition duration-200 hover:text-heading"
                        title={('Edit')}
                        >
                        <EditIcon width={16} />
                    </Link>
                )
            }
            {enablePreviewMode && (
                <>
                    {previewUrl && (
                        <Link
                            href={previewUrl}
                            className="text-base transition duration-200 hover:text-heading"
                            title={('Preview')}
                            target="_blank"
                        >
                            <EyeIcon width={18} />   
                        </Link>
                    )}
                </>
            )}
            {deleteModalView && ( 
                
                <button
                    onClick={handleDelete}
                    className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
                    title={('Delete')}
                >
                    <TrashIcon width={14}/>
                </button>   
            )}
        </div>
    )
}

export default ActionButtons;