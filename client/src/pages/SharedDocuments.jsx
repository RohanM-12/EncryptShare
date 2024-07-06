import { Image } from "antd";
import React from "react";

const SharedDocuments = () => {
  return (
    <div className="flex justify-center">
      <Image
        draggable={false}
        width={500}
        preview={false}
        src="/src/assets/img/process.gif"
      />
    </div>
  );
};

export default SharedDocuments;
