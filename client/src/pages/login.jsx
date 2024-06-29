import { Button, Input, Form, Image } from "antd";
import Password from "antd/es/input/Password";
import { IoMdLogIn } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");

  const onFinish = async (values) => {
    try {
      const result = await axios.post("/api/v1/user/login", {
        ...values,
      });

      if (result?.data?.status === 200) {
        toast.success("Login Successful");
        navigate("/");
      } else if (result?.data?.status == 403) {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-auto w-auto rounded-md">
          <div className="col-span-1 flex items-center">
            <img src="/src/assets/img/loginScreenBG.gif" />
          </div>
          <div className="col-span-1 p-3">
            <Form onFinish={onFinish}>
              <h1 className="text-gray-900 text-center font-bold text-xl font-sans my-4 ">
                <span className="flex justify-center">
                  <FaUser fontSize={22} className="mx-2" /> LOGIN
                </span>
              </h1>
              <div className=" border-l-4 border-gray-200 "></div>
              <div className="p-5 ">
                <Form.Item
                  name={"email"}
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please provide valid email",
                    },
                  ]}
                  initialValue={email}
                >
                  <Input
                    className="p-2 s"
                    placeholder=" Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Please provide input",
                    },
                  ]}
                >
                  <Password className="p-2 " placeholder="Enter Password" />
                </Form.Item>
                <div className="flex justify-center  mt-10">
                  <Button
                    htmlType="submit"
                    type="secondary"
                    className="flex  bg-gray-900 text-white font-semibold w-28 hover:bg-gray-500 "
                    size="large"
                    onSubmit={onFinish}
                  >
                    <IoMdLogIn fontSize={22} className="mx-0.5" />
                    <span> LOGIN</span>
                  </Button>
                </div>
                <Link to={"/signup"}>
                  <p className="text-blue-400 text-sm text-center mt-5 hover:text-blue-800">
                    New user? Reigster
                  </p>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
