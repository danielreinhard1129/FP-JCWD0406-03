import { ChangeEvent, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { baseUrl } from '@/utils/config';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

export default function PaymentProof({ data, onInputChange }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const params = useParams();

  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const handleCancelOrder = async () => {
    if (!user.id) {
      toast.error('Success cancel your order', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'light',
      });
      return router.replace('/login');
    }

    await axios.patch(baseUrl + `/transaction/cancel-order/${params.uuid}`);
    toast.success('Success cancel your order', {
      position: 'top-right',
      autoClose: 1000,
      theme: 'light',
    });
    router.replace('/');
  };

  const updatePhotePayment = async (formData: FormData) => {
    try {
      const token = localStorage.getItem('token_auth');

      await axios.patch(baseUrl + `/transaction/${data.uuid}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      window.location.reload();
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleSubmitPaymentProof = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension || '')) {
      // Jika ekstensi file tidak diizinkan, tampilkan pesan kesalahan
      toast.error('File must be JPG or PNG format.');
      return;
    }

    const maxSize = 1024 * 1024; // 1MB dalam byte
    if (selectedFile.size > maxSize) {
      toast.error('File size must be less than 1MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    // Jika file lolos validasi, lanjutkan dengan mengirimkan data
    const formData = new FormData();
    formData.append('file', selectedFile);
    await updatePhotePayment(formData);
    onInputChange(formData);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="flex flex-row gap-3">
        <button
          className="mt-6 w-40 py-3.5 text-sm bg-red-900 text-white rounded-md hover:bg-blue-600"
          onClick={handleCancelOrder}
        >
          Cancel order
        </button>
        <button
          className="mt-6 w-40 py-3.5 text-sm bg-blue-900 text-white rounded-md hover:bg-blue-600"
          onClick={() => setOpenModal(true)}
        >
          Upload payment proof
        </button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Upload your payment proof</Modal.Header>
        <Modal.Body>
          <div className="flex w-full items-center justify-center">
            {selectedImage ? (
              <div className="relative mb-4 p-6">
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  onClick={removeImage}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <Image
                  src={
                    typeof selectedImage === 'string'
                      ? selectedImage
                      : URL.createObjectURL(
                          new Blob([
                            new Uint8Array(selectedImage as ArrayBuffer),
                          ]),
                        )
                  }
                  alt="Selected"
                  className="w-full h-full"
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG (MAX. 1 MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleSubmitPaymentProof}
                />
              </label>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
