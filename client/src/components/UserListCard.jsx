import { Avatar, Button } from "antd";
import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
const UserListCard = ({ userData, selectedUsers, setSelectedUsers }) => {
  return (
    <>
      <div className="flex justify-center drop-shadow-xl">
        <div className="flex items-center border-2 border-gray-300 my-1 rounded-xl hover:border-gray-400 w-80 md:w-2/3 ">
          <Avatar className="float-start p-5 bg-gray-600 text-xl m-2 border-2 border-black">
            {userData.name[0].toUpperCase()}
          </Avatar>
          <div className="mx-2 text-black">{userData?.name}</div>
          <div className="mx-2 text-gray-500 w-screen">
            Email : {userData?.email}
          </div>
          <PlusCircleOutlined
            onClick={() => {
              setSelectedUsers([...selectedUsers, userData]);
            }}
            className="text-2xl text-gray-600 hover:cursor-pointer mx-3 "
          />
        </div>
      </div>
    </>
  );
};

export default UserListCard;
