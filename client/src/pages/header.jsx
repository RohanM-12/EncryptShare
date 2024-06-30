import { Avatar, Dropdown, Input, Space } from "antd";
import React, { Children } from "react";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
const Header = () => {
  const items = [
    {
      key: "1",
      label: (
        <Link
          to="/login"
          className="flex items-center space-x-1 p-1 font-bold "
        >
          <TbLogout color="red" size={20} />
          <h4>LOGOUT</h4>
        </Link>
      ),
    },
  ];
  return (
    <div className="space-x-5 w-sreen p-5">
      <div className=" grid grid-cols-3 w-full">
        <div className=" flex justify-end col-span-2 ">
          <Input
            className=" w-1/2 drop-shadow-xl text-center border-2 border-gray-400"
            size="large"
            placeholder="🔍 Search Document"
          />
        </div>
        <div className="flex justify-end col-span-1 ">
          <Dropdown
            className="text-gray-800"
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  size={40}
                  className="bg-gray-800 drop-shadow-2xl shadow-xl mr-5"
                >
                  <span className="font-semibold"> {"U"} </span>
                </Avatar>
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className=" float-right "></div>
    </div>
  );
};

export default Header;
