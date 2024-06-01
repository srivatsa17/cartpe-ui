import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import { Toaster, toast } from "sonner";

import React from "react";
import { deactivateAccount } from "redux/AuthService/deactivateSlice";
import { useReduxDispatch } from "hooks/redux";

function DeactivateAccount() {
    const dispatch = useReduxDispatch();
    const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const handleDeactivateAccount = () => {
        setIsSubmitting(true);
        const toastId = toast.loading("Please wait a moment while we deactivate your account.", {
            position: "top-right",
            duration: 4000
        });

        setTimeout(() => {
            dispatch(deactivateAccount()).catch((error) => {
                toast.error("Failed to deactivate your account.", {
                    description: error,
                    position: "top-right",
                    duration: 4000,
                    id: toastId
                });
            });
            setIsSubmitting(false);
            onClose();
        }, 2000);
    };

    return (
        <div>
            <Toaster richColors closeButton />
            <Button fullWidth className="max-w-md" color="danger" size="lg" onPress={onOpen}>
                Deactivate account
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="md"
                backdrop="opaque"
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent>
                    {() => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1 capitalize text-2xl">
                                Deactivate account
                            </ModalHeader>
                            <ModalBody>
                                Are you sure you want to deactivate your CartPe account? This action
                                is irreversible.
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="flat"
                                    type="submit"
                                    onPress={handleDeactivateAccount}
                                    isDisabled={isSubmitting}
                                    isLoading={isSubmitting}
                                >
                                    Yes, deactivate
                                </Button>
                                <Button
                                    color="primary"
                                    variant="flat"
                                    onPress={onClose}
                                    isDisabled={isSubmitting}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default DeactivateAccount;
