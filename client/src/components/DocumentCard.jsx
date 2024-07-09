import React, { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Avatar, Image, Popconfirm, Tooltip } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/authcontext";
import { filesize } from "filesize";
import ShareDrawer from "./ShareDrawer";
import SpinnerCircle from "./SpinnerCircle";
import dayjs from "dayjs";
import { FaShareNodes } from "react-icons/fa6";

const DocumentCard = ({ docData, fetchData, shared }) => {
  const docTypes = ["txt", "pdf", "pptx", "docx", "xlsx"];
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getImageSrc = () => {
    const extension = docData?.name?.split(".")[1];
    return docTypes.includes(extension)
      ? `/img/${extension}.png`
      : `/img/default.png`;
  };

  const handleDocumentDelete = async () => {
    try {
      const { status } = await axios.delete("/api/v1/document/deleteDocument", {
        params: { id: docData?.id, mongoId: docData?.mongoId },
      });
      if (status === 200) {
        toast.warn("File deleted successfully");
        fetchData();
      }
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
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", docData?.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 bg-stone-50 hover:bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-3 relative">
        <p
          className={`text-xs drop-shadow-sm text-gray-500 ${
            shared === 1
              ? "absolute top-2 left-1/2 transform -translate-x-1/2"
              : "absolute top-2 left-2"
          }`}
        >
          {dayjs(docData?.sharedDateTime).format("MMM D, YYYY • h:mm A")}
        </p>
        {shared === 0 && (
          <Tooltip
            title={
              <div>
                <p className="font-semibold">
                  Shared by : {docData?.senderName}
                </p>
                <p>{docData?.senderEmail}</p>
              </div>
            }
          >
            <Avatar
              size={35}
              className="drop-shadow-md border-2 border-white absolute top-2 right-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white cursor-pointer"
            >
              {docData?.senderName[0]?.toUpperCase()}
            </Avatar>
          </Tooltip>
        )}

        <div className="mt-8 flex justify-center items-center drop-shadow-lg">
          <Image
            preview={false}
            width={80}
            src={getImageSrc()}
            alt="Document type"
            className="object-contain hover:scale-125 transition-transform duration-300"
          />
        </div>

        <h3 className="mt-3 text-center font-semibold text-gray-800 truncate">
          {docData?.name}
        </h3>
        <p className="text-sm text-center text-gray-500 mt-1">
          {filesize(docData.size)}
        </p>
      </div>

      <div className="border-t border-gray-200 p-1.5 flex justify-around">
        <Link
          onClick={downloadDocument}
          className="text-green-500 hover:text-green-700"
        >
          {loading ? (
            <SpinnerCircle tip="Downloading" color="#7ae582" />
          ) : (
            <FaCloudDownloadAlt size={30} />
          )}
        </Link>
        {shared === 1 && (
          <>
            <Link
              onClick={() => setIsOpen(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaShareNodes size={27} />
            </Link>
            <Popconfirm
              title="Delete document"
              description="Are you sure to delete the file?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDocumentDelete}
            >
              <Link className="text-red-500 hover:text-red-700">
                <MdDeleteForever size={30} />
              </Link>
            </Popconfirm>
          </>
        )}
      </div>
      <ShareDrawer open={isOpen} setIsOpen={setIsOpen} docData={docData} />
    </div>
  );
};

export default DocumentCard;
