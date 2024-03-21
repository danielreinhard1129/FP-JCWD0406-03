/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Image from 'next/image';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button } from 'flowbite-react';
import { useState } from 'react';
import { IProperty } from '../../../../../types/types';

const YourComponent = ({ data }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [getData, setGetData] = useState([]);
  setGetData(data);
  console.log(getData, 'hello');

  return (
    <div className="bg-[#182237] p-[20px] rounded-[10px] mt-[20px]">
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-start">
            <img
              src="https://res-console.cloudinary.com/di2tpq1iy/thumbnails/v1/image/upload/v1705977319/YnVrdGlfcGVtYmF5YXJhbl9zcHNrMTM=/preview"
              alt="payment"
            />
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openFailed}
        size="md"
        onClose={() => setOpenFailed(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to reject this transaction?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure">{"Yes, I'm sure"}</Button>
              <Button color="gray" onClick={() => setOpenFailed(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={openAccept}
        size="md"
        onClose={() => setOpenAccept(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to Accept this transaction?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                // onClick={() => handleSuccess(trans?.uuid, trans?.email)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray">No, cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <table className="w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Destination</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {/* {getData?.map((item) => {
            const date = new Date(`${item?.transactio[0]?.createdAt}`);
            const formatDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const monthName = formatDate.split(',')[0];
            let createdAt = `${date.getFullYear()} ${monthName}`;

            return (
              <tr key={item.id}>
                <td className="h-16">
                  <div className="flex gap-[10px] items-center">
                    <div>
                      <Image
                        src="/noAvatar.png"
                        alt=""
                        width="40"
                        height="40"
                        className="object-cover rounded-full"
                      />
                    </div>
                    {item.transaction[0]?.user.name}
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <span
                    className={`rounded-lg p-2 text-[14px] text-white ${
                      item.transaction[0]?.status.title == 'success'
                        ? 'bg-[#afd6ee75]'
                        : item.transaction[0]?.status.title == 'failed'
                          ? 'bg-[#f7737375]'
                          : 'bg-[#f7cb7375]'
                    }`}
                  >
                    {item.transaction[0]?.status.title}
                  </span>
                </td>
                <td>{createdAt}</td>
                <td>${item.transaction[0]?.total}</td>
                <td>
                  <div className="flex gap-[10px]">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="py-[4px] px-[6px] text-white border-none cursor-pointer bg-[#f7cb7375] rounded-lg"
                    >
                      detail
                    </button>
                    <button className="py-[4px] px-[6px] text-white border-none cursor-pointer bg-[teal] rounded-lg">
                      success
                    </button>
                    <button className="py-[4px] px-[6px] text-white border-none cursor-pointer bg-[crimson] rounded-lg">
                      cancelled
                    </button>
                  </div>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
