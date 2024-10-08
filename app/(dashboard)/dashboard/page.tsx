import { Button } from "@nextui-org/react";
import Module from "@/components/Module";
import modules from "@/assets/modules.json";

const Dashboard = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="text-4xl">My Modules</h1>
        <Button className="bg-[#0E793C] text-white">Create New</Button>
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
