import { Avatar, Dropdown, Input, Space } from "antd";
import React, { Children } from "react";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { CaretDownOutlined } from "@ant-design/icons";
const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setAuth({ user: null, token: "" });
    // navigate("/login");
  };
  const items = [
    {
      key: "1",
      label: (
        <Link
          onClick={handleLogOut}
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
    <>
      {auth && auth?.user && (
        <div className="space-x-5 w-sreen p-5">
          <div className=" grid grid-cols-3 w-full">
            <div className=" flex justify-end col-span-2 ">
              <Input
                className="w-3/2 lg:w-1/2 md:2/3 h-12 drop-shadow-xl text-center border-2 border-gray-400"
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
                <a
                  className="grid grid-cols-1 justify-center "
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    <Avatar
                      size={55}
                      className="flex justify-center border-2 border-white bg-stone-800 drop-shadow-2xl shadow-xl mr-5 p-0 m-0 hover:cursor-pointer"
                    >
                      <div className="font-semibold m-0 p-0 -mb-3">
                        {auth?.user.name.substr(0, 1).toUpperCase()}{" "}
                      </div>

                      {/* <div className="">{auth?.user?.name?.toUpperCase()}</div> */}
                      <span className="p-0">
                        <CaretDownOutlined />
                      </span>
                    </Avatar>
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <div className=" float-right "></div>
        </div>
      )}
    </>
  );
};

export default Header;
