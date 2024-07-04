import { Avatar, Button } from "antd";
import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
const UserListCard = ({ userData }) => {
  return (
    <>
      <div className="flex justify-center drop-shadow-xl">
        <div className=" flex items-center border-2 border-gray-300 my-1 rounded-xl w-3/4  hover:border-gray-400">
          <Avatar className="float-start p-5 bg-gray-600 text-xl m-2 border-2 border-black">
            {userData.name[0].toUpperCase()}
          </Avatar>
          <div className=" w-full flex justify-end mx-5">
            <PlusCircleOutlined className="text-2xl text-gray-600 hover:cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserListCard;
