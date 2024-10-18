import Module from "@/components/Module";
import modules from "@/assets/modules.json";

export default function Learn() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-y-scroll">
      <div className="mx-16 my-12">
        <h1 className="text-4xl">Modules</h1>
        <h2>AP®︎/College US Government and Politics</h2>
        <div className="mt-4 mb-8">
          {modules["modules"].map((module) => {
            return <Module module={module} key={module.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
