import { Image } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import DocumentCard from "../components/DocumentCard";
import DocCardSkeleton from "../components/DocCardSkeleton";

const SharedDocuments = () => {
  const [auth] = useAuth();
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [loading, setLoading] = useState();
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/v1/document/getSharedDocuments", {
        params: { userId: auth?.user?.id },
      });
      setSharedDocuments(data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-10 py-5 lg:grid-cols-4 lg:px-20 md:grid-cols-3 ">
        {loading
          ? Array(12)
              .fill()
              .map((_, index) => <DocCardSkeleton key={index} />)
          : sharedDocuments?.length > 0 &&
            sharedDocuments?.map((item, i) => (
              <div key={item?.id} className="drop-shadow-md">
                <DocumentCard docData={item} fetchData={fetchData} shared={0} />
              </div>
            ))}
      </div>

      {sharedDocuments?.length === 0 && (
        <div className="flex justify-center">
          <Image
            draggable={false}
            width={500}
            preview={false}
            src="/src/assets/img/process.gif"
          />
        </div>
      )}
    </>
  );
};

export default SharedDocuments;
