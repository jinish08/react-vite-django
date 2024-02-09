import React, { useState } from "react";
import Button from "../Button";

const AddModal = ({ setShowAddModal, setDocName, setContent }) => {
  const [doc, setDoc] = useState("");
  const handleAdd = () => {
    setShowAddModal(false);
    setDocName(doc);
    setContent((prev) => [
      ...prev,
      {
        doc_name: doc,
        versions: [],
      },
    ]);
  };
  return (
    <div className="fixed inset-0 bg-white backdrop-blur-sm bg-opacity-60 flex justify-center items-center p-5">
      <div className="bg-white flex flex-col w-64 gap-6 rounded-xl border-2 shadow-lg">
        <div className="relative items-center flex justify-center text-white bg-[#000842] p-5 rounded-t-xl h-full w-full">
          <div className="text-xl text-center font-medium">Document name</div>
        </div>
        <div className="flex flex-col px-3 pb-3 justify-center items-center gap-2">
          <div className="text-sm font-semibold w-full">
            Enter a document name :
          </div>
          <input
            className="w-full rounded-lg outline-none text-xs border-[1px] border-gray-300 px-1 py-2"
            placeholder="Enter your new document name"
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
          />
          <Button onClick={() => handleAdd()} icon="add">
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
