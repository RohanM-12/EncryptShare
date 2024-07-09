import React, { useEffect, useState, useCallback } from "react";
import DocumentCard from "../components/DocumentCard";
import BtnUpload from "../components/BtnUpload";
import UploadDocumentModal from "../components/uploadDocumentModal";
import axios from "axios";
import { useAuth } from "../context/authcontext";
import DocCardSkeleton from "../components/DocCardSkeleton";
import { useSearch } from "../context/searchContext";
import { useDebounce } from "../context/useDebounce";
import { Image } from "antd";

const MyDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [documents, setDocuments] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useSearch();

  const handleUploadClick = () => {
    setOpen(true);
  };

  const fetchData = useCallback(
    async (search) => {
      try {
        if (auth?.user?.id) {
          setLoading(true);
          const { data } = await axios.get("/api/v1/document/getDocuments", {
            params: {
              userId: auth?.user?.id,
              searchText: search,
            },
          });
          setDocuments(data?.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    },
    [auth?.user?.id]
  );

  const debouncedFetch = useDebounce(fetchData, 500);

  useEffect(() => {
    debouncedFetch(searchText);
  }, [searchText, debouncedFetch]);

  return (
    <>
      <div className="grid grid-cols-1 gap-10 px-10 py-5 lg:grid-cols-4 lg:px-20 md:grid-cols-3">
        {loading
          ? Array(8)
              .fill()
              .map((_, index) => <DocCardSkeleton key={index} />)
          : documents?.length > 0 &&
            documents?.map((item) => (
              <div key={item?.id} className="drop-shadow-md">
                <DocumentCard
                  docData={item}
                  fetchData={() => fetchData(searchText)}
                  shared={1}
                />
              </div>
            ))}
      </div>
      {documents?.length === 0 && loading === false && (
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

      <BtnUpload onClick={handleUploadClick} />
      <UploadDocumentModal
        open={open}
        setOpen={setOpen}
        fetchData={() => fetchData(searchText)}
      />
    </>
  );
};

export default MyDocuments;
