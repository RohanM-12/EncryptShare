import { Tabs } from "antd";
import React from "react";
import MyDocuments from "./MyDocuments";
import SharedDocuments from "./SharedDocuments";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbLockShare } from "react-icons/tb";

const { TabPane } = Tabs;

const Homepage = () => {
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
    </div>
  );
};

export default Homepage;
