"use client";

import { baseUrl } from "@/utils/config";
import axios from "axios";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";

const AddImageForEvents = () => {
  const updatePhotoEvents = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("token_auth");

      const { data } = await axios.patch(
        baseUrl + "/user/photo-profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(data);
      window.location.reload();
      toast.info("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        toast.info("File size exceeds the limit of 1 MB.");
        return;
      }

      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.info("Only JPG, JPEG, and PNG files are allowed.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      await updatePhotoEvents(formData);
    }
  };

  return (
    <main>
      <div>
        <input type="file" onChange={onChangeFile} />
      </div>
    </main>
  );
};

export default AddImageForEvents;
