import { useDeleteProductMutation } from "@/data/role";
import ConfirmationCard from "../common/confirmation-card"
import { useModalAction, useModalState } from "../ui/modal/modal.context"
import { getErrorMessage } from "@/utils/form-error";

const RoleDeleteView = () => {
    const { mutate:deleteProduct, isLoading: loading} = 
        useDeleteProductMutation();
    const { data } = useModalState();
    const { closeModal } = useModalAction();

    async function handleDelete() {
        try{
            deleteProduct({ id: data });
            closeModal();
        } catch (error) {
            closeModal();
            getErrorMessage(error);
        }
    }

    return (
        <ConfirmationCard
            onCancel={closeModal}
            onDelete={handleDelete}
            deleteBtnLoading={loading}
        />
    )
}

export default RoleDeleteView;