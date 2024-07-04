/* eslint-disable react/prop-types */
import { Drawer, Input } from "antd";
import React from "react";
import { FaShareNodes } from "react-icons/fa6";
import UserListCard from "./UserListCard";

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
        className="rounded-2xl"
        placement={"bottom"}
        closable={true}
        onClose={() => setIsOpen(false)}
        open={open}
        height={500}
      >
        <div className="grid grid-cols-2">
          <div className="px-2">
            <div className="text-center text-lg font-semibold">
              List of Users
            </div>
            <div className="flex justify-center my-2">
              <Input
                placeholder={` 🧑🏻‍💼 Search User with Email/User name`}
                className="w-1/2 text-center border-2 border-gray-400"
                size="large"
              />
            </div>
            <div className="grid grid-cols-1 px-5 py-2 ">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((userData, i) => (
                <UserListCard userData={{ name: "Rohan" }} key={i} />
              ))}
            </div>
          </div>
          <div className="p-5">
            <div></div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ShareDrawer;
