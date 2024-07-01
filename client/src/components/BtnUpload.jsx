import React from "react";
import { IoCloudUploadSharp } from "react-icons/io5";

const BtnUpload = () => {
  return (
    <div className="bg-gray-400 w-24 h-16 rounded-full flex drop-shadow-2xl  justify-center items-center m-5 border-2 hover:border-gray-950 hover:shadow-xl ">
      <IoCloudUploadSharp size={30} />
    </div>
  );
};

export default BtnUpload;
