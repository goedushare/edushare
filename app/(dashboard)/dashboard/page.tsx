"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import Module from "@/components/Module";
import modules from "@/assets/modules.json";
import Modal from "@/components/Modal";
import TextField from "@/components/TextField";
import { useState } from "react";

const Dashboard = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onOpenChange: onModalOpenChange,
  } = useDisclosure();

  const onCreate = (onClose: () => void) => {
    onClose();
    setModuleName("");
  };

  const [moduleName, setModuleName] = useState("");

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">My Modules</h1>
        <Button className="bg-[#0E793C] text-white" onPress={onModalOpen}>
          Create New
        </Button>
        <Modal
          isOpen={isModalOpen}
          onOpenChange={onModalOpenChange}
          title="Create Module"
          actionText="Create"
          onAction={onCreate}
        >
          <div>
            <TextField
              label="Name"
              value={moduleName}
              setValue={setModuleName}
              labelPlacement="inside"
            />
          </div>
        </Modal>
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
