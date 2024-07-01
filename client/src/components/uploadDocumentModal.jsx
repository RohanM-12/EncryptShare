/* eslint-disable react/prop-types */
import { Button, Form, Image, Input, Modal, Upload } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useAuth } from "../context/authcontext";

const UploadDocumentModal = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [auth] = useAuth();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [file, setFile] = useState(null);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      setConfirmLoading(true);
      try {
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          form.resetFields();
          setFile(null);
          setFileName("");
          setFileExtension("");
          toast.success("Document uploaded successfully");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.error("Validation Error:", err);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFile(null);
    setFileName("");
    setFileExtension("");
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (info) => {
    let newFile = info.file;
    if (!newFile.type.startsWith("image/")) {
      if (newFile.type === "text/plain") {
        newFile.thumbUrl = "/src/assets/img/text.png";
      } else if (newFile.type === "application/pdf") {
        newFile.thumbUrl = "/src/assets/img/pdf.png";
      } else if (
        newFile.type === "application/msword" ||
        newFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        newFile.thumbUrl = "/src/assets/img/word.png";
      } else if (
        newFile.type === "application/vnd.ms-powerpoint" ||
        newFile.type ===
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        newFile.thumbUrl = "/src/assets/img/ppt.png";
      } else {
        newFile.thumbUrl = "/src/assets/img/default.png";
      }
    }
    setFile(newFile);

    const fullName = newFile.name;
    const lastDotIndex = fullName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      setFileName(fullName.substring(0, lastDotIndex));
      setFileExtension(fullName.substring(lastDotIndex));
    } else {
      setFileName(fullName);
      setFileExtension("");
    }

    console.log(newFile);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName("");
    setFileExtension("");
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    form.setFieldsValue({ fileName: fileName });
  }, [fileName, form]);

  return (
    <>
      <Modal
        title="Upload Document "
        visible={open}
        onOk={handleOk}
        confirm
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name={"File"} className="flex justify-center">
            <Upload
              accept="*/*"
              fileList={file ? [file] : []}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
              listType="picture-card"
              onRemove={handleRemove}
            >
              {file ? null : uploadButton}
            </Upload>
            {file && (
              <p className="text-center" style={{ marginTop: 8 }}>
                {file.name}
              </p>
            )}
            {previewImage && (
              <Image
                width={200}
                src={previewImage}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                }}
              />
            )}
          </Form.Item>
          <Form.Item name={"fileName"} className="text-center">
            <Input
              placeholder="Rename file? (leave empty if no)"
              name="fileName"
              className="text-center w-2/3"
              onChange={(e) => setFileName(e.target.value)}
              addonAfter={fileExtension}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UploadDocumentModal;
