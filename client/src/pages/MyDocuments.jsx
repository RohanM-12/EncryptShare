import React, { Children } from "react";
import { Tabs } from "antd";
import DocumentCard from "../components/DocumentCard";
const MyDocuments = () => {
  return (
    <>
      <div>
        <DocumentCard />
        {/* {[1, 2, 3].map((document, i) => {
          <>
            <DocumentCard key={i} />
          </>;
        })} */}
      </div>
    </>
  );
};

export default MyDocuments;
