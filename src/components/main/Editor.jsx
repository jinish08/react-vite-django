import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import Button from "../Button";
import toast from "react-hot-toast";
import axios from "axios";
import Saly from "../../assets/Saly-10.png";
import Icons from "../Icons";

const Editor = ({
  setActiveDoc,
  setContent,
  setDocName,
  activeDoc,
  content,
  docName,
  getData,
}) => {
  useEffect(() => {
    if (docName) {
      activeDoc = content.find((doc) => doc.doc_name === docName);
    }
  }, [getData]);

  const [activeVersions, setActiveVersions] = useState([]);

  const [typedData, setTypedData] = useState("");

  const getNewVersionID = () => {
    const currentDoc = activeDoc;
    console.log(currentDoc?.versions);
    if (!currentDoc?.versions || currentDoc?.versions?.length === 0) {
      return "0";
    }
    let id = Math.max(
      currentDoc?.versions.map((version) => parseInt(version.version))
    );
    return id.toString();
  };

  const handleAnalyseButtonClicked = async () => {
    if (docName === "") {
      toast.error("Please enter a document name");
    } else {
      const user = localStorage.getItem("user");
      await axios
        .post(`/users/`, {
          key: user,
          doc_name: docName,
          data: {
            version: getNewVersionID(),
            content: typedData,
          },
        })
        .then((res) => {
          getData();
          toast.success("Data saved successfully");
          setTypedData("");
        })
        .catch((error) => {
          toast.error("Error saving data", error);
        });
    }
  };

  const deleteVersion = (document_name, version) => {
    const user = localStorage.getItem("user");
    let v = parseInt(version);
    axios
      .delete(`/users/${user}/${document_name}/${v}`)
      .then((res) => {
        getData();
        toast.success("Version Deleted Successfully!");
      })
      .catch((err) => toast.error(err.message));
  };

  const deleteDocument = (document_name) => {
    const user = localStorage.getItem("user");
    const doc = content.find((doc) => doc.doc_name === document_name);
    doc.versions.forEach((version) => {
      deleteVersion(document_name, version.version);
    });
    setContent(content.filter((doc) => doc.doc_name !== document_name));
    setDocName("");
    setActiveDoc([]);
    toast.success("Document Deleted Successfully!");
  };

  const [mouseOverDoc, setMouseOverDoc] = useState(false);

  const [mouseOverVersion, setMouseOverVersion] = useState("");

  return (
    <div className="w-full ms-16 h-full mx-auto py-6 px-10 bg-gray-100 rounded-md">
      {docName ? (
        <>
          <div
            className="w-full items-center flex justify-center"
            onMouseEnter={() => setMouseOverDoc(true)}
            onMouseLeave={() => setMouseOverDoc(false)}
          >
            <div className="font-bold w-full text-3xl">
              {activeDoc?.doc_name}
            </div>
            {mouseOverDoc && (
              <div
                className="hover:bg-gray-400 rounded-full cursor-pointer hover:bg-opacity-25 h-7 w-7 flex items-center justify-center text-sm mb-1"
                onClick={() => deleteDocument(activeDoc?.doc_name)}
              >
                <Icons name="delete" width={16} height={16} />
              </div>
            )}
          </div>
          <div className="w-full h-[1px] my-4 rounded-full bg-gray-600 bg-opacity-25" />
          <div className="w-full h-[65%] hideScroll overflow-y-auto">
            {activeDoc?.versions?.map((version) => (
              <div
                key={version?.version}
                className="mb-4 w-full"
                onMouseEnter={() => setMouseOverVersion(version?.version)}
                onMouseLeave={() => setMouseOverVersion("")}
              >
                <div className="w-full justify-between flex items-center">
                  <div className="font-bold text-sm mb-1">
                    Version {version?.version}
                  </div>
                  {mouseOverVersion === version?.version ? (
                    <div
                      className="hover:bg-gray-400 rounded-full cursor-pointer hover:bg-opacity-25 h-7 w-7 flex items-center justify-center text-sm mb-1"
                      onClick={() =>
                        deleteVersion(activeDoc?.doc_name, version?.version)
                      }
                    >
                      <Icons name="delete" width={16} height={16} />
                    </div>
                  ) : (
                    <div className="h-8 w-8"> </div>
                  )}
                </div>
                <div className="bg-white border border-gray-300 p-3 rounded-md">
                  <div className="font-bold">You: </div>
                  {version?.content?.map((contentItem, index) => (
                    <div key={index}>
                      {contentItem?.sentences?.map(
                        (sentence) =>
                          sentence?.content.length > 0 &&
                          sentence?.content !== " " &&
                          sentence?.content !== "" &&
                          sentence?.content !== "." && (
                            <div
                              key={sentence?.sentence_id}
                              className="mb-1 text-sm"
                            >
                              {sentence?.content}
                            </div>
                          )
                      )}
                      <div
                        className="mt-4 text-xs mb-2 hover:underline text-[#0C21C1] cursor-pointer"
                        onClick={() => {
                          if (activeVersions.includes(version?.version)) {
                            setActiveVersions(
                              activeVersions.filter(
                                (item) => item !== version?.version
                              )
                            );
                          } else
                            setActiveVersions([
                              ...activeVersions,
                              version?.version,
                            ]);
                        }}
                      >
                        {activeVersions.includes(version.version)
                          ? "Hide"
                          : "Show analysis"}
                      </div>
                      {activeVersions.includes(version?.version) && (
                        <Statistics data={version?.content} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full h-[75%] flex flex-col items-center justify-center bg-white rounded-lg border-gray-300  border-[1px]">
          <img src={Saly} alt="Logo" className="h-64 -mt-10 w-fit" />
          <div className="mt-5 font-bold text-gray-700">WELCOME TO</div>
          <div className="mt-2 flex flex-col items-center justify-center text-3xl font-bold">
            <div className="text-black italic -mb-2">ESSAY</div>
            <div className="text-[#0C21C1]">ANALYZER</div>
          </div>
        </div>
      )}
      <div className="w-full py-3 h-36 flex justify-center items-center">
        <div className="w-full bg-white h-full rounded-lg border-[1px] overflow-hidden border-gray-300 relative">
          <textarea
            className="w-[90%] h-full p-4 outline-none text-sm"
            placeholder="Enter your text..."
            rows="3"
            value={typedData}
            onChange={(e) => setTypedData(e.target.value)}
            style={{ resize: "none" }}
          />
          <div className="w-[15%] px-5 absolute flex justify-center items-center right-0 top-0 h-full">
            <Button
              onClick={() => {
                handleAnalyseButtonClicked();
              }}
              icon={"analyze"}
            >
              Analyze
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
