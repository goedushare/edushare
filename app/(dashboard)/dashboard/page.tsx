"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import Module from "@/components/Module";
import modules from "@/assets/modules.json";
import ModuleModal from "@/components/Modal";

const Dashboard = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const onCreate = (onClose: () => void) => {
    onClose();
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">My Modules</h1>
        <Button className="bg-[#0E793C] text-white" onPress={onModalOpen}>
          Create New
        </Button>
        <ModuleModal
          isOpen={isModalOpen}
          onOpenChange={onModalOpenChange}
          title="Create Module"
          actionText="Create"
          onAction={onCreate}
        ></ModuleModal>
      </div>
      <div className="mt-4 mb-8">
        {modules["modules"].map((module) => {
          return <Module module={module} isEditable={true} key={module.id} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
