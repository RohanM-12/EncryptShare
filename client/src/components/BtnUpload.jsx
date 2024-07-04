import { FloatButton } from "antd";
import React from "react";
import { CloudUploadOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const BtnUpload = ({ onClick }) => {
  return (
    <FloatButton
      className="hover:drop-shadow-2xl hover:scale-105 ease-out duration-300 "
      icon={<CloudUploadOutlined className=" text-white rounded-2xl p-0.5 " />}
      type="secondary"
      style={{
        width: 64,
        height: 64,
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
