import React, { Children, useState } from "react";

import DocumentCard from "../components/DocumentCard";
import BtnUpload from "../components/BtnUpload";
import UploadDocumentModal from "../components/uploadDocumentModal";
const MyDocuments = () => {
  const [open, setOpen] = useState(false);
  const handleUploadClick = () => {
    setOpen(true);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-4 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7].map((item, i) => {
          return <DocumentCard key={item} />;
        })}
        {/* {[1, 2, 3].map((document, i) => {
          <>
            <DocumentCard key={i} />
          </>;
        })} */}
      </div>

      {/* <div
        onClick={() => setOpen(true)}
        className="absolute bottom-10 right-20"
      > */}
      <BtnUpload onClick={handleUploadClick} />
      <UploadDocumentModal open={open} setOpen={setOpen} />
      {/* </div> */}
    </>
  );
};

export default MyDocuments;
