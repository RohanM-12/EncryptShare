import { Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/signup", values);
      if (res?.data?.status == 200) {
        navigate("/login");
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
                  <FaUser fontSize={22} className="mx-2" /> SIGNUP
                </span>
              </h1>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    required: true,
                    message: "Please provide a valid email",
                    type: "email",
                  },
                ]}
              >
                <Input className="p-2" placeholder=" Enter Email" />
              </Form.Item>

              <Form.Item
                name={"UseName"}
                rules={[{ required: true, message: "Please provide input" }]}
              >
                <Input className="p-2" placeholder=" Enter user name" />
              </Form.Item>
              <Form.Item
                name={"password"}
                rules={[
                  { required: true, message: "Please provide input" },
                  {
                    min: 6,
                    message: "Password Length must be greater than 6",
                  },
                ]}
              >
                <Password
                  autoComplete="current-password"
                  className="p-2"
                  placeholder="Enter Password"
                />
              </Form.Item>
              <div className="flex justify-center ">
                <Button
                  htmlType="submit"
                  size="large"
                  type="secondary"
                  className=" flex bg-gray-900 text-white font-semibold w-32 hover:bg-gray-600 "
                  onSubmit={onFinish}
                >
                  <FaCirclePlus fontSize={24} />
                  SIGN-UP
                </Button>
              </div>
            </Form>
            <Link to={"/login"}>
              <p className="text-blue-400 text-sm text-center mt-5 hover:text-blue-800">
                Already registered? Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
