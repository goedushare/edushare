"use client";

import TextField from "./TextField";

const NewFlashcard = ({
  number,
  term,
  setTerm,
  definition,
  setDefinition,
}: {
  number: number;
  term: string;
  setTerm?: (term: string) => void;
  definition: string;
  setDefinition: (definition: string) => void;
}) => {
  return (
    <div className="p-4 bg-slate-50 border-1 rounded-2xl">
      <div>
        <h2 className="text-xl font-semibold">{String(number)}</h2>
      </div>
      <div className="flex flex-row justify-between space-x-4 mt-4 pb-1">
        <TextField placeholder="Term" value={term} setValue={setTerm} />
        <TextField
          placeholder="Definition"
          value={definition}
          setValue={setDefinition}
        />
      </div>
    </div>
  );
};

export default NewFlashcard;
