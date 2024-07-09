import { FloatButton, Image } from "antd";
import React from "react";

// eslint-disable-next-line react/prop-types
const BtnUpload = ({ onClick }) => {
  return (
    <FloatButton
      className="drop-shadow-2xl hover:scale-105 ease-out duration-100 "
      icon={
        // <CloudUploadOutlined className=" shadow-sm  text-white rounded-2xl p-0.5 " />
        <Image
          width={28}
          preview={false}
          draggable="false"
          className="p-0 -ml-1"
          src="/img/logo.png"
        />
      }
      type=""
      style={{
        width: 64,
        height: 64,
        bottom: 70,
        right: 30,
        background: "#333333",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // drop-shadow-2xl
        borderColor: "#6b7280", // hover:border-gray-950
      }}
      onClick={onClick}
    />
  );
};

export default BtnUpload;
