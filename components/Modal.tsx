import {
  Button,
  Modal as NextModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import TextField from "./TextField";

const Modal = ({
  isOpen,
  onOpenChange,
  title,
  children,
  actionText,
  onAction,
  onCloseModal,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  title: string;
  children?: React.ReactNode;
  actionText?: string;
  onAction?: (onClose: () => void) => void;
  onCloseModal?: () => void;
}) => {
  return (
    <NextModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onCloseModal}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button className="" onPress={onClose}>
                Cancel
              </Button>
              {onAction && actionText && (
                <Button
                  className="bg-[#0E793C] text-white"
                  onPress={() => onAction(onClose)}
                >
                  {actionText}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextModal>
  );
};

export default Modal;
