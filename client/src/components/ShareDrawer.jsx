/* eslint-disable react/prop-types */
import { Avatar, Button, Drawer, Empty, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaShareNodes } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import UserListCard from "./UserListCard";
import axios from "axios";
import SpinnerCircle from "./SpinnerCircle";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

const ShareDrawer = ({ open, setIsOpen, docData }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const searchTimeOutRef = useRef(null);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const endpoint = searchText
        ? "/api/v1/user/searchUser"
        : "/api/v1/user/getAllUsers";
      const { data } = await axios.get(endpoint, { params });
      setUsers(data?.data);
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      fetchData({ currLen: 0, loadLen: 5 });
    }
  }, [open]);

  useEffect(() => {
    if (searchText) {
      if (searchTimeOutRef.current) {
        clearTimeout(searchTimeOutRef.current);
      }
      searchTimeOutRef.current = setTimeout(() => {
        fetchData({ searchText });
      }, 1000);
    } else if (open) {
      fetchData({ currLen: 0, loadLen: 5 });
    }
  }, [searchText]);

  const handleRemoveUser = (value) => {
    const temp = selectedUsers.filter((user) => user.id !== value.id);
    setSelectedUsers([...temp]);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Drawer
        title={
          <div className="flex justify-center items-center">
            <FaShareNodes size={25} className="mx-2 text-blue-500" />
            <span className="text-md font-bold">
              <span className="text-blue-500"> Share : </span>
              <span>{docData.name}</span>
            </span>
          </div>
        }
        className="rounded-2xl"
        placement={"bottom"}
        closable={true}
        onClose={() => setIsOpen(false)}
        open={open}
        height={500}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="px-2">
            <div className="flex justify-center items-center text-center text-lg font-semibold">
              List of Users
              <HiMiniUsers size={25} className="mx-2 text-gray-500" />
            </div>
            <div className="flex justify-center my-2">
              <Input
                placeholder=" 🧑🏻‍💼 Search User with Email/User name"
                className="w-3/2 md:w-1/2 text-center border-2 border-gray-400"
                size="large"
                onChange={handleSearch}
              />
            </div>
            <div className="grid grid-cols-1 px-5 py-2">
              {!loading &&
                users.length > 0 &&
                users.map((userData, i) => (
                  <UserListCard
                    userData={userData}
                    key={i}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                  />
                ))}
              {!loading && users.length === 0 && (
                <div className="flex justify-center items-center h-72">
                  <Empty description="No users found" />
                </div>
              )}
              {loading && (
                <div className="flex justify-center items-center h-72">
                  <SpinnerCircle size={50} tip="Loading users" color="gray" />
                </div>
              )}
            </div>
          </div>
          <div className="px-5">
            <div className="flex justify-center text-lg font-semibold">
              <div className="text-center">
                Add user to give access to the file
              </div>
            </div>
            <div className="px-10 flex justify-center">
              <Button
                type="default"
                className="bg-red-500 hover:bg-red-400 text-white"
                onClick={() => setSelectedUsers([])}
              >
                <MdOutlinePlaylistRemove size={30} /> Revoke all
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 mt-5">
              {selectedUsers.map((user) => (
                <div
                  key={user?.id}
                  className="border-2 flex items-center justify-start w-fit h-auto rounded-xl shadow-md p-1"
                >
                  <Avatar className="bg-gray-600 text-xl border-2 border-black">
                    {user?.name[0]?.toUpperCase()}
                  </Avatar>
                  <span className="mx-2 truncate">{user?.name}</span>
                  <div className="mx-1">
                    <IoMdCloseCircle
                      size={28}
                      className="hover:cursor-pointer text-red-400 hover:text-red-600"
                      onClick={() => handleRemoveUser(user)}
                    />
                  </div>
                </div>
              ))}
            </div>
            {selectedUsers.length === 0 && (
              <div className="flex justify-center mt-5">
                <Empty description="No user selected" />
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ShareDrawer;
