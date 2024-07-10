import { Drawer, Timeline, Spin, Typography } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoAnalyticsOutline } from "react-icons/io5";
import { FiShare2, FiDownload, FiUser } from "react-icons/fi";
import { LoadingOutlined } from "@ant-design/icons";
const { Text } = Typography;

const ActivityDrawer = ({ fileId, activityOpen, setActivityOpen }) => {
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/logs/getFileLogData", {
        params: { fileId },
      });
      setLogData(data?.data);
    } catch (error) {
      console.error("Error loading logs:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activityOpen) {
      loadLogs();
    }
  }, [activityOpen]);

  return (
    <Drawer
      placement="right"
      title={
        <div className="flex justify-center items-center text-gray-700 font-bold">
          <IoAnalyticsOutline className="mr-2" size={22} />
          <span>Activity Timeline</span>
        </div>
      }
      open={activityOpen}
      onClose={() => setActivityOpen(false)}
      width={400}
      className="rounded-xl"
      bodyStyle={{ padding: "16px 20px" }}
    >
      <Spin
        className="text-gray-600   "
        size="large"
        indicator={<LoadingOutlined spin />}
        spinning={loading}
      >
        <div className="flex justify-center ">
          <Timeline mode="left">
            {logData.map((item, index) => (
              <Timeline.Item
                key={index}
                color={item?.action === "Shared" ? "#1890ff" : "#52c41a"}
                dot={
                  item?.action === "Shared" ? (
                    <FiShare2 size={20} />
                  ) : (
                    <FiDownload size={22} />
                  )
                }
              >
                <div className="bg-blue-50 drop-shadow-md p-2 w-64 rounded-md shadow-sm mb-0 mt-0  ">
                  <div className="flex items-center mb-0">
                    <FiUser className="mr-2 text-gray-700" />
                    <Text strong>{item?.user?.name}</Text>
                  </div>
                  <Text className="block mb-0">
                    {item?.action === "Shared"
                      ? "Shared the file"
                      : "Downloaded the file"}
                  </Text>
                  <Text type="secondary" className="text-xs">
                    {dayjs(item?.timeStamp).format("MMM D, YYYY • h:mm A")}
                  </Text>
                </div>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </Spin>
    </Drawer>
  );
};

export default ActivityDrawer;
