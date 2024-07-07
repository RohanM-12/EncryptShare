import { Skeleton, Space } from "antd";
import React from "react";

const DocCardSkeleton = () => {
  return (
    <div className="bg-gray-100 drop-shadow-xl w-60">
      <Space className="flex justify-center -mb-5">
        <Skeleton.Image active />
      </Space>
      <br />
      <Skeleton.Button active size="small" block className="-mb-0" />
      <br />
      <Space className="flex justify-center mt-1">
        <Skeleton.Input active size="small" />
      </Space>

      {/* <Skeleton.Input active size block /> */}
      <Space className="grid grid-cols-3 ml-5 mt-2 -mb-4">
        <Skeleton.Avatar active size="small" shape />
        <Skeleton.Avatar active size="small" shape />
        <Skeleton.Avatar active size="small" shape />
      </Space>
      <br />
    </div>
  );
};

export default DocCardSkeleton;
