import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import Editor from "./Editor";

const MainModule = ({ setIsLoggedIn, user, setUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  const [content, setContent] = useState([]);
  const [activeDoc, setActiveDoc] = useState([]);
  const [docName, setDocName] = useState("");

  const getData = async () => {
    if (!user) {
      if (localStorage.getItem("user")) {
        setUser(localStorage.getItem("user"));
        let historyuser = localStorage.getItem("user");
        await axios
          .get(`/users/${historyuser}`)
          .then((res) => {
            setContent(res.data);
            toast.success("Data fetched successfully");
          });
      }
    } else {
      await axios.get(`/users/${user}`).then((res) => {
        setContent(res.data);
        toast.success("Data fetched successfully");
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (docName !== "") {
      setActiveDoc(content.find((doc) => doc.doc_name === docName));
    }
  }, [content, docName]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Sidebar
        content={content}
        setContent={setContent}
        user={user}
        setUser={setUser}
        activeDoc={activeDoc}
        setActiveDoc={setActiveDoc}
        setDocName={setDocName}
      />
      <Editor
        setActiveDoc={setActiveDoc}
        setDocName={setDocName}
        setContent={setContent}
        activeDoc={activeDoc}
        content={content}
        docName={docName}
        getData={getData}
      />
    </div>
  );
};

export default MainModule;
