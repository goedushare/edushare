"use client";

import TextField from "./TextField";

const NewFlashcard = ({
  number,
  term,
  setTerm,
  definition,
  setDefinition,
  removeFlashcard,
}: {
  number: number;
  term: string;
  setTerm: (term: string) => void;
  definition: string;
  setDefinition: (definition: string) => void;
  removeFlashcard: () => void;
}) => {
  return (
    <div className="relative p-4 bg-slate-50 border-1 rounded-2xl">
      <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all duration-200"
          onClick={removeFlashcard}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
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
