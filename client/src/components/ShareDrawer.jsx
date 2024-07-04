/* eslint-disable react/prop-types */
import { Drawer } from "antd";
import React from "react";
import { FaShareNodes } from "react-icons/fa6";

const ShareDrawer = ({ open, setIsOpen }) => {
  return (
    <div>
      <Drawer
        title={
          <div className="flex justify-center ">
            <FaShareNodes size={25} className="mx-2 text-blue-500" />
            <span className="text-md font-bold">Share File </span>{" "}
          </div>
        }
        className="rounded-2xl "
        placement={"bottom"}
        closable={true}
        onClose={() => setIsOpen(false)}
        open={open}
        height={500}
      ></Drawer>
    </div>
  );
};

export default ShareDrawer;
