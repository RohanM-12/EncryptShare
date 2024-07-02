import { FloatButton } from "antd";
import React from "react";
import { CloudUploadOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const BtnUpload = ({ onClick }) => {
  return (
    // <div className="bg-gray-400 w-24 h-16 rounded-full flex drop-shadow-2xl  justify-center items-center m-5 border-2 hover:border-gray-950 hover:shadow-xl ">
    //   <IoCloudUploadSharp size={30} />
    // </div>
    <FloatButton
      icon={<CloudUploadOutlined />}
      className="bg-gray-500"
      style={{
        width: 74,
        height: 74,
        bottom: 50,
        right: 60,

        background: "gray",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // drop-shadow-2xl
        borderColor: "#6b7280", // hover:border-gray-950
      }}
      onClick={onClick}
    />
  );
};

export default BtnUpload;
