// AddImageForProperty.tsx
import { baseUrl } from "@/utils/config";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

interface Props {
  propertyId: number;
}

const AddImageForProperty = ({ propertyId }: Props) => {
  const uploadImage = async (formData: FormData) => {
    try {
      const token = localStorage.getItem("token_auth");

      const { data } = await axios.patch(
        `${baseUrl}/property/picture/${propertyId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.info("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 1200,
        theme: "colored",
      });
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleAddImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpg, .jpeg, .png";
    input.onchange = async (e: any) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        if (selectedFile.size > 1024 * 1024) {
          toast.error("File size exceeds the limit of 1MB.");
          return;
        }
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        if (!allowedTypes.includes(selectedFile.type)) {
          toast.error("Only JPG, JPEG, and PNG files are allowed.");
          return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        await uploadImage(formData);
      }
    };

    input.click();
  };

  return (
    <button
      onClick={handleAddImageClick}
      className=" text-sky-700 hover:text-sky-900 flex items-center"
    >
      <Image
        src={"/images/icon-property/add-image.png"}
        alt="Add image"
        width={30}
        height={30}
      />
    </button>
  );
};

export default AddImageForProperty;
