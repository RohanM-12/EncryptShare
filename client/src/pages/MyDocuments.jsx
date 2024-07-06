import React, { Children, useEffect, useState } from "react";
import DocumentCard from "../components/DocumentCard";
import BtnUpload from "../components/BtnUpload";
import UploadDocumentModal from "../components/uploadDocumentModal";
import axios from "axios";
import { useAuth } from "../context/authcontext";
const MyDocuments = () => {
  const [auth] = useAuth();
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const handleUploadClick = () => {
    setOpen(true);
  };
  const fetchData = async () => {
    try {
      if (auth?.user?.id) {
        const { data } = await axios.get("/api/v1/document/getDocuments", {
          params: { userId: auth?.user?.id },
        });
        //console.log(data.data);
        setDocuments(data?.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [auth.user]);
  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-10 py-5 lg:grid-cols-4 lg:px-20 md:grid-cols-3 ">
        {documents?.length > 0 &&
          documents?.map((item, i) => {
            return (
              <div key={item.id} className="drop-shadow-md">
                <DocumentCard docData={item} fetchData={fetchData} />
              </div>
            );
          })}
      </div>

      <BtnUpload onClick={handleUploadClick} />
      <UploadDocumentModal
        open={open}
        setOpen={setOpen}
        fetchData={fetchData}
      />
    </>
  );
};

export default MyDocuments;
