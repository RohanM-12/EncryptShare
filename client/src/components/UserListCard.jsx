import { Avatar } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import { toast } from "react-toastify";
import SpinnerCircle from "./SpinnerCircle";
const UserListCard = ({
  userData,
  selectedUsers,
  setSelectedUsers,
  docData,
}) => {
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const handleAddAccess = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/document/shareDocument", {
        ownerId: auth?.user?.id,
        fileId: docData?.id,
        userData,
      });

      if (data?.status == 200) {
        setSelectedUsers([...selectedUsers, userData]);
        toast.success(`Access granted to ${userData?.name}`);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      if (error.response.data.error.code == "P2002") {
        toast.error(`User already has access to ${docData?.name}`);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="flex items-center border-2 drop-shadow-2xl border-gray-300 my-1 rounded-xl hover:border-gray-400 w-80 md:w-80 ">
          <Avatar className="float-start p-5 bg-gradient-to-br from-indigo-600 to-purple-400 text-xl m-2 border-2 border-white drop-shadow-sm">
            {userData?.name[0]?.toUpperCase()}
          </Avatar>
          <div className="flex-grow">
            <div className="mx-2 text-black">{userData?.name}</div>
            <div className="mx-2 text-gray-500 ">
              {userData?.email?.length > 15
                ? userData?.email?.substr(0, 15) + "..."
                : userData?.email}
            </div>
          </div>
          {loading == true ? (
            <>
              <SpinnerCircle color={"purple"} size={"default"} />{" "}
            </>
          ) : (
            <PlusCircleOutlined
              onClick={() => {
                handleAddAccess();
              }}
              className="text-2xl text-blue-400 hover:cursor-pointer mx-3"
            />
          )}
        </div>
      </div>
    </>
  );
};
export default UserListCard;
