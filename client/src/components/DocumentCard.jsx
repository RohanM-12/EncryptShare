import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaShareNodes } from "react-icons/fa6";
const DocumentCard = () => {
  return (
    <div className="h-auto w-fit border-2 border-gray-300 rounded-lg p-2">
      <div className="w-64">
        <img src={"/src/assets/img/documentPreview.gif"} alt="preview" />
      </div>
      <div className="grid grid-cols-3 justify-center items-center  ">
        <span className="flex justify-center">
          <FaCloudDownloadAlt size={30} />
        </span>
        <span className="flex justify-center">
          <MdDeleteForever size={30} />
        </span>
        <span className="flex justify-center">
          <FaShareNodes size={25} />
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;
