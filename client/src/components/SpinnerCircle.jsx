/* eslint-disable react/prop-types */
import { Spin } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const SpinnerCircle = ({ size, tip, color }) => {
  return (
    <Spin
      //  indicator={<LoadingOutlined spin />}
      tip={tip}
      style={{
        color: `${color}`,
        fontSize: `${size}px`,
      }}
      // size={`${size}` + "px"}
      size={50}
    />
  );
};

export default SpinnerCircle;
