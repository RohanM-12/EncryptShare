import { Tabs } from "antd";
import React, { useState } from "react";
import MyDocuments from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbLockShare } from "react-icons/tb";
import BtnUpload from "../components/BtnUpload";
import UploadDocumentModal from "../components/uploadDocumentModal";

const { TabPane } = Tabs;

const Homepage = () => {
  const [open, setOpen] = useState(false);

  const items = [
    {
      key: "1",
      label: "My Documents",
      icon: <IoDocumentTextOutline size={20} className="mx-1" />,
      content: <MyDocuments />,
    },
    {
      key: "2",
      label: "Shared Documents",
      icon: <TbLockShare size={20} className="mx-1" />,
      content: <SharedDocuments />,
    },
  ];

  return (
    <>
      <div className="p-2">
        <Tabs className="font-semibold" defaultActiveKey="1" centered>
          {items.map((item) => (
            <TabPane
              tab={
                <span className="flex justify-center items-center mx-2">
                  {item.icon}
                  {item.label}
                </span>
              }
              key={item.key}
            >
              {item.content}
            </TabPane>
          ))}
        </Tabs>
        <div
          onClick={() => setOpen(true)}
          className="absolute bottom-10 right-20"
        >
          <BtnUpload />
        </div>
      </div>
      <UploadDocumentModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Homepage;
