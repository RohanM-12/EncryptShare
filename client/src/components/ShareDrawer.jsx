/* eslint-disable react/prop-types */
import { Avatar, Button, Drawer, Empty, Image, Input, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaShareNodes } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import UserListCard from "./UserListCard";
import axios from "axios";
import SpinnerCircle from "./SpinnerCircle";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import UserAccessCard from "./UserAccessCard";
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div>
      <Drawer
        title={
          <div className="flex justify-center items-center p-0 m-0">
            <FaShareNodes size={25} className="mx-2 text-gray-500" />
            <span className="text-md font-bold">
              <span className="text-gray-500 hidden lg:inline"> Share : </span>
              <span className="text-clip text-gray-600">{docData?.name}</span>
            </span>
          </div>
        }
        className="rounded-2xl p-0 m-0    "
        placement={"bottom"}
        closable={true}
        onClose={() => setIsOpen(false)}
        open={open}
        height={520}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <div className="px-2">
            <div className="flex justify-center text-gray-600 items-center text-center text-lg font-semibold ">
              List of Users
              <HiMiniUsers size={25} className="mx-2 text-gray-500" />
            </div>
            <div className="flex justify-center my-0.5">
              <Input
                placeholder=" 🧑🏻‍💼 Search User with Email/User name"
                className="w-3/2 md:w-1/2 text-center border-2 border-gray-400"
                size="large"
                onChange={handleSearch}
              />
            </div>
            <div className="grid grid-cols-1 px-5 py-1">
              {!loading &&
                users?.length > 0 &&
                users?.map((userData, i) => (
                  <UserListCard
                    userData={userData}
                    key={i}
                    selectedUsers={selectedUsers}
                    setSelectedUsers={setSelectedUsers}
                    docData={docData}
                  />
                ))}
              {!loading && users?.length === 0 && (
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
              <div className="flex justify-center items-center mb-2">
                <span className="text-center text-gray-600 drop-shadow-xl mt-5  lg:mt-0 md:mt-0">
                  Add user to give access to the file{" "}
                </span>
                <span>
                  <TiUserAdd size={25} className="text-gray-500 mx-1" />
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="default"
                className=" "
                onClick={() => setSelectedUsers([])}
              >
                <MdOutlinePlaylistRemove size={27} /> Revoke all
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-3 mt-5 ">
              {selectedUsers?.map((user) => (
                <UserAccessCard
                  key={user?.id}
                  selectedUsers={selectedUsers}
                  user={user}
                  setSelectedUsers={setSelectedUsers}
                  docData={docData}
                />
              ))}
            </div>
            {selectedUsers.length === 0 && (
              <>
                <p className="text-center text-md text-gray-500 font-semibold">
                  No user added
                </p>
                <div className="flex justify-center ">
                  {/* <Empty description="No user selected" /> */}
                  <div className="flex justify-center">
                    <Image
                      loading="lazy"
                      width={300}
                      draggable={false}
                      preview={false}
                      src="/src/assets/img/process.gif"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ShareDrawer;
