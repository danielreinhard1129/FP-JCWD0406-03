"use client";

import { baseUrl } from "@/utils/config";
import axios from "axios";
import { ChangeEvent } from "react";

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
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
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
