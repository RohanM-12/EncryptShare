import { Button, Form, Input, Select, Tag } from "antd";
import IMGUpload from "../Components/IMGupload";
import TextArea from "antd/es/input/TextArea";
import TechSelect from "../Components/TechSelect";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaLaptopCode } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
const UploadPost = () => {
  const [techList, setTechList] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const onFinish = async (values) => {
    try {
      if (techList.length === 0) {
        toast("Select at least one technologies", {
          icon: <FaLaptopCode size={25} className="text-blue-500" />,
        });
        return;
      }
      if (thumbnailImage == null) {
        toast("Please select thumbnail image", {
          icon: <FaImage size={25} className="text-blue-500" />,
        });
      }
      const result = await axios.post("/api/v1/posts/createPost", {
        ...values,
        thumbnailImage,
        technologiesUsed: techList,
      });
      if (result?.data?.status == 200) {
        toast.success("Post uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-6">
        <h1 className="text-center text-3xl text-blue-500 font-bold font-mono">
          UPLOAD POST
        </h1>
        <div className=" mt-4 w-screen border-t-2 border-gray-400"></div>

        <Form
          layout="vertical"
          size="large"
          onFinish={onFinish}
          enctype="multipart/form-data"
        >
          <div className=" grid grid-cols-2 ">
            <div className="p-16 pt-2">
              <Form.Item name={"thumbnailImage"} label={" Thumbnail Image :"}>
                <IMGUpload setThumbImg={setThumbnailImage} />
              </Form.Item>
              <Form.Item
                label="Enter Project Title :"
                name={"Title"}
                className="w-80"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Enter Project Description : "
                name="Description"
                className="w-80"
                rules={[{ required: true }]}
              >
                <TextArea rows={5} cols={5} />
              </Form.Item>
            </div>
            <div className="p-16  pt-2">
              <Form.Item
                className="w-80"
                label="Paste GitHub Repo. URL :"
                name={"gitHubLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-80"
                label="Paste public URL  (if deployed) :"
                name={"deployedLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="w-80"
                label="Paste Demo video URL  :"
                name={"demoVideoLink"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"technologiesUsed"}
                className="w-80"
                label="Select Technologies used : "
              >
                <TechSelect techList={{ techList }} setTechList={setTechList} />
              </Form.Item>
              <Form.Item className="my-6">
                <Button
                  htmlType="submit"
                  className="bg-blue-600 text-white hover:bg-blue-400"
                  onClick={onFinish}
                >
                  Post Project
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UploadPost;
