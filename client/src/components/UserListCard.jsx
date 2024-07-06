import { Avatar, Button } from "antd";
import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import { toast } from "react-toastify";
const UserListCard = ({
  userData,
  selectedUsers,
  setSelectedUsers,
  docData,
}) => {
  const [auth] = useAuth();
  const handleAddAccess = async () => {
    try {
      const { data } = await axios.post("/api/v1/document/shareDocument", {
        ownerId: auth?.user?.id,
        fileId: docData?.id,
        userData,
      });
      if (data?.status == 200) {
        setSelectedUsers([...selectedUsers, userData]);
        toast.success(`Access granted to ${userData?.name}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center ">
        <div className="flex items-center border-2 drop-shadow-2xl border-gray-300 my-0.5 rounded-xl hover:border-gray-400 w-80 md:w-2/3 ">
          <Avatar className="float-start p-5 bg-gradient-to-br from-slate-500 to-stone-500 text-xl m-2 border-2 border-white drop-shadow-2xl">
            {userData?.name[0]?.toUpperCase()}
          </Avatar>
          <div className="mx-2 text-black">{userData?.name}</div>
          <div className="mx-2 text-gray-500 w-screen">
            Email : {userData?.email}
          </div>
          <PlusCircleOutlined
            onClick={() => {
              handleAddAccess();
            }}
            className="text-2xl text-gray-600 hover:cursor-pointer mx-3 "
          />
        </div>
      </div>
    </>
  );
};

export default UserListCard;
