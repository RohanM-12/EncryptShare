import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
import { Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const DocumentCard = ({ docData, fetchData }) => {
  const docTypes = ["txt", "pdf", "pptx", "docx", "xlsx"];
  const getImageSrc = () => {
    const extension = docData?.name?.split(".")[1];
    console.log(extension);
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
      console.log(data);
      if (data?.status == 200) {
        toast.success("File deleted successfully");
      }
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="h-auto w-fit border-2 border-gray-300 rounded-lg p-1 drop-shadow-2xl">
      <div className="w-64 flex justify-center items-center">
        <Image preview={false} height={120} src={getImageSrc()} alt="img" />
      </div>
      <div className="my-2 text-center text-gray-600">
        {docData?.name?.split(".")[0].length > 18
          ? docData?.name?.split(".")[0].substr(0, 17) +
            "..." +
            docData?.name?.split(".")[1]
          : docData?.name}
      </div>
      <div className=" border-b-2 my-1 border-gray-300"></div>
      <div className="grid grid-cols-3 justify-center items-center  ">
        <span className="flex justify-center hover:text-green-500 ">
          <FaCloudDownloadAlt size={30} />
        </span>
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
        <span className="flex justify-center hover:text-blue-500">
          <FaShareNodes size={25} />
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
