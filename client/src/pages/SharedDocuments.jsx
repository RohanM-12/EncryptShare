import { Image } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/authcontext";
import DocumentCard from "../components/DocumentCard";
import DocCardSkeleton from "../components/DocCardSkeleton";
import { useSearch } from "../context/searchContext";
import { useDebounce } from "../context/useDebounce";

const SharedDocuments = () => {
  const [searchText, setSearchText] = useSearch();
  const [auth] = useAuth();
  const [sharedDocuments, setSharedDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/document/getSharedDocuments", {
        params: {
          userId: auth?.user?.id,
          searchText: searchText,
        },
      });
      setSharedDocuments(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }, [auth?.user?.id, searchText]);

  const debouncedFetch = useDebounce(fetchData, 500);

  useEffect(() => {
    if (auth?.user?.id) {
      debouncedFetch(searchText);
    }
  }, [auth?.user?.id, debouncedFetch, searchText]);

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

      {sharedDocuments?.length === 0 && loading === false && (
        <>
          <div className="text-center font-mono text-lg text-gray-400">
            📁 NO DATA
          </div>
          <div className="flex justify-center">
            <Image
              draggable={false}
              width={500}
              preview={false}
              src="/img/process.gif"
            />
          </div>
        </>
      )}
    </>
  );
};

export default SharedDocuments;
