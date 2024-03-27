/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Button, TabItem } from "flowbite-react";
import { useEffect, useState } from "react";
import { IProperty, ITransaction } from "../../../../../types/types";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import { baseUrl } from "@/utils/config";
import Link from "next/link";
import { log } from "console";
import { handleSuccess } from "@/hooks/handleSuccess";
import { data } from "cypress/types/jquery";
import { handleResendEmail } from "@/hooks/handleResendEmail";
import { handleReject } from "@/hooks/handleReject";

const YourComponent = () => {
  const [openFailed, setOpenFailed] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [getData, setGetData] = useState<ITransaction[]>([]);
  const [getProperty, setProperty] = useState<IProperty[]>([]);
  useEffect(() => {
    const handleGetData = async () => {
      const { data } = await axios.get(
        baseUrl + `/management/property/${user.id}`
      );
      setGetData(data.data);
    };
    const handleGetDataProperty = async () => {
      const { data } = await axios.get(baseUrl + `/management/${user.id}`);
      setProperty(data.data);
    };
    handleGetData();
    handleGetDataProperty();
  }, []);

  const handleClick = () => {
    alert("User has not uploaded proof of payment");
  };

  return (
    <div className="bg-[#182237] p-[20px] rounded-[10px] mt-[20px]">
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
            <td>Order Id</td>
            <td>Destination</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {getData?.map((item) => {
            const date = new Date(`${item?.createdAt}`);
            const formatDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const monthName = formatDate.split(",")[0];
            let createdAt = `${date.getFullYear()} ${monthName}`;

            return (
              <tr key={item.id}>
                <td className="h-16">{item.orderId}</td>
                <td className="h-16">{getProperty.map((i) => i.name)}</td>

                <td>
                  <span
                    className={`rounded-lg p-2 text-[14px] text-white ${
                      item?.statusTransaction === "CONFIRM"
                        ? "bg-[#32a852]" // Warna hijau untuk status CONFIRM
                        : item?.statusTransaction === "REJECT"
                        ? "bg-[#d32f2f]" // Warna merah untuk status REJECT
                        : item?.statusTransaction === "EXPIRED"
                        ? "bg-[#ffc107]" // Warna kuning untuk status EXPIRED
                        : item?.statusTransaction === "CANCEL"
                        ? "bg-[#795548]" // Warna coklat untuk status CANCEL
                        : "bg-[#1976d2]" // Warna biru untuk status lainnya (misalnya PROCESS)
                    }`}
                  >
                    {item.statusTransaction}
                  </span>
                </td>
                <td>{createdAt}</td>
                <td>${item.total}</td>
                <td>
                  <div className="flex gap-[10px]">
                    {!item.paymentProof ? (
                      <button
                        className="py-[4px] px-[6px] text-white border-none cursor-pointer bg-[#f7cb7375] rounded-lg"
                        onClick={handleClick}
                      >
                        Detail
                      </button>
                    ) : (
                      <Link
                        className="py-[4px] px-[6px] text-white border-none cursor-pointer bg-[#f7cb7375] rounded-lg"
                        href={`http://localhost:8000/payment-proof/${item.paymentProof}`}
                        target="_blank"
                      >
                        Detail
                      </Link>
                    )}

                    <button
                      onClick={() =>
                        handleSuccess(item.uuid, item.user.email, item.checkOut)
                      }
                      disabled={
                        item.statusTransaction === "CONFIRM" ||
                        item.statusTransaction === "EXPIRED" ||
                        item.statusTransaction === "CANCEL" ||
                        item.statusTransaction === "REJECT"
                      }
                      className={`py-[4px] px-[6px] text-white border-none cursor-pointer rounded-lg ${
                        item.statusTransaction === "CONFIRM" ||
                        item.statusTransaction === "EXPIRED" ||
                        item.statusTransaction === "CANCEL" ||
                        item.statusTransaction === "REJECT"
                          ? "bg-gray-400"
                          : "bg-teal-600"
                      }`}
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => handleReject(item.uuid, item.user.email)}
                      disabled={
                        item.statusTransaction === "CONFIRM" ||
                        item.statusTransaction === "REJECT" ||
                        item.statusTransaction === "CANCEL"
                      }
                      className={`py-[4px] px-[6px] text-white border-none cursor-pointer rounded-lg ${
                        item.statusTransaction === "CONFIRM" ||
                        item.statusTransaction === "REJECT" ||
                        item.statusTransaction === "CANCEL"
                          ? "bg-gray-400"
                          : "bg-red-600"
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleResendEmail(item.uuid)}
                      disabled={
                        !!item.paymentProof ||
                        item.statusTransaction === "CANCEL" ||
                        item.statusTransaction === "REJECT"
                      } // Nonaktifkan tombol jika item.paymentProof sudah ada
                      className={`py-[4px] px-[6px] text-white border-none cursor-pointer rounded-lg ${
                        !!item.paymentProof ||
                        item.statusTransaction === "CANCEL" ||
                        item.statusTransaction === "REJECT"
                          ? "bg-gray-400"
                          : "bg-[#FF9800]"
                      }`}
                    >
                      Resend email
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
