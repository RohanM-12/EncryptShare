/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import { Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/authcontext";
import { filesize } from "filesize";
import ShareDrawer from "./ShareDrawer";
import SpinnerCircle from "./SpinnerCircle";
const DocumentCard = ({ docData, fetchData }) => {
  const docTypes = ["txt", "pdf", "pptx", "docx", "xlsx"];
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const getImageSrc = () => {
    const extension = docData?.name?.split(".")[1];

    const imgPath = docTypes.find((item) => item === extension)
      ? `/src/assets/img/${extension}.png`
      : `/src/assets/img/default.png`;
    return imgPath;
  };

  const handleDocumentDelete = async () => {
    try {
      const data = await axios.delete("/api/v1/document/deleteDocument", {
        params: { id: docData?.id, mongoId: docData?.mongoId },
      });

      if (data?.status == 200) {
        toast.warn("File deleted successfully");
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const downloadDocument = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/document/download", {
        params: {
          mongoId: docData.mongoId,
          id: docData.id,
          userId: auth?.user?.id,
        },
        responseType: "blob",
      });
      let filename = docData?.name;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setLoading(false);
    } catch (error) {
      console.error("Download error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="h-auto w-fit border-2 border-gray-300 rounded-lg p-1 drop-shadow-2xl lg:hover:scale-105 ease-out duration-200 sm:hover:scale-100 shadow-md ">
      <div className="w-64 flex justify-center items-center">
        <Image
          preview={false}
          height={100}
          src={getImageSrc()}
          alt="img"
          className="hover:scale-125 ease-out duration-200 "
        />
      </div>
      <div className="my-2 text-center text-gray-600">
        {docData?.name?.split(".")[0].length > 18
          ? docData?.name?.split(".")[0].substr(0, 17) +
            "..." +
            docData?.name?.split(".")[1]
          : docData?.name}
      </div>
      <div className="text-center text-sm text-gray-500 font-normal">
        {filesize(docData.size)}
      </div>
      <div className=" border-b-2 my-1 border-gray-300"></div>
      <div className="grid grid-cols-3 justify-center items-center  ">
        <Link
          onClick={downloadDocument}
          className="flex justify-center hover:text-green-500 "
        >
          {loading ? (
            <SpinnerCircle tip={"Downloading"} color={"#7ae582"} />
          ) : (
            <FaCloudDownloadAlt size={30} />
          )}
        </Link>
        <Popconfirm
          title="Delete document"
          description="Are you sure to delete the file?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDocumentDelete}
        >
          <Link className="flex justify-center hover:text-red-500">
            <MdDeleteForever size={30} />
          </Link>
        </Popconfirm>
        <Link
          onClick={() => setIsOpen(true)}
          className="flex justify-center hover:text-blue-500"
        >
          <FaShareNodes size={25} />
        </Link>
      </div>
      <ShareDrawer open={isOpen} setIsOpen={setIsOpen} docData={docData} />
    </div>
  );
};

export default DocumentCard;
