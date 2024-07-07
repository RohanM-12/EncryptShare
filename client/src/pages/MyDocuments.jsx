import React, { Children, useEffect, useState } from "react";
import DocumentCard from "../components/DocumentCard";
import BtnUpload from "../components/BtnUpload";
import UploadDocumentModal from "../components/uploadDocumentModal";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import DocCardSkeleton from "../components/DocCardSkeleton";
const MyDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const handleUploadClick = () => {
    setOpen(true);
  };
  const fetchData = async () => {
    try {
      if (auth?.user?.id) {
        setLoading(true);
        const { data } = await axios.get("/api/v1/document/getDocuments", {
          params: { userId: auth?.user?.id },
        });
        //console.log(data.data);
        setDocuments(data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [auth?.user]);
  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-10 py-5 lg:grid-cols-4 lg:px-20 md:grid-cols-3">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => <DocCardSkeleton key={index} />)
          : documents?.length > 0 &&
            documents?.map((item) => (
              <div key={item?.id} className="drop-shadow-md">
                <DocumentCard docData={item} fetchData={fetchData} shared={1} />
              </div>
            ))}
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
