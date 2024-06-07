import Module from "@/app/components/Module";
import modules from "../assets/modules.json";

export default function Learn() {
  return (
    <div className="mx-16 my-12">
      <h1 className="text-4xl">Modules</h1>
      <h2>AP®︎/College US Government and Politics</h2>
      <div className="mt-4">
        {modules["modules"].map((module) => {
          return <Module module={module} key={module.id} />;
        })}
      </div>
    </div>
  );
}
