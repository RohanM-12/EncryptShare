import { Avatar, Tooltip } from "antd";
import axios from "axios";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { useAuth } from "../context/authcontext";

const UserAccessCard = ({ user, selectedUsers, setSelectedUsers, docData }) => {
  const [auth] = useAuth();
  const handleRemoveUser = async (value) => {
    try {
      const { data } = await axios.put("/api/v1/document/removeUserAccess", {
        userId: user?.id,
        fileId: docData?.id,
      });
      if (data?.status == 200) {
        const temp = selectedUsers?.filter((user) => user?.id !== value?.id);
        setSelectedUsers([...temp]);
        toast.warn(`Access removed for ${user?.name}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={user?.id}
      className=" ml-5 relative w-4/6 bg-white border border-gray-200 rounded-lg shadow-md p-0.1 transition duration-300 ease-in-out hover:shadow-lg"
    >
      <button
        onClick={() => handleRemoveUser(user)}
        className="absolute -top-1 -right-1 text-gray-400 hover:text-red-600 transition duration-200"
        aria-label="Remove user"
      >
        {auth?.user?.id != user?.id && <IoMdCloseCircle size={24} />}
      </button>

      <div className="flex flex-col items-center">
        <Tooltip
          title={
            <>
              <div className="text-center font-bold text-gray-600">
                {auth?.user.id == user?.id ? "You" : ""}
              </div>
              <span className="text-center font-bold text-gray-600">
                {user?.email}
              </span>
            </>
          }
          color="#c0c0c0"
        >
          <div className="relative mt-1">
            <Avatar className="w-10 h-10 text-xl font-semibold bg-gradient-to-tr from-indigo-600 to-purple-400 text-white border-2 border-white shadow-md hover:cursor-pointer">
              {user?.name[0]?.toUpperCase()}
            </Avatar>
          </div>
        </Tooltip>

        <h3 className="text-md font-medium text-gray-900 truncate max-w-[calc(100%-2rem)]">
          {user?.name}
        </h3>
      </div>
    </div>
  );
};

export default UserAccessCard;
