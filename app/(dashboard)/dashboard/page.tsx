import { Button } from "@nextui-org/react";

const Dashboard = () => {
  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-4xl">My Modules</h1>
      <Button className="bg-[#0E793C] text-white">Create New</Button>
    </div>
  );
};

export default Dashboard;
