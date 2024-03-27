/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import Image from 'next/image';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button, TabItem } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { IProperty, ITransaction } from '../../../../../types/types';
import { useAppSelector } from '@/lib/hooks';
import axios from 'axios';
import { baseUrl } from '@/utils/config';
import Link from 'next/link';
import { log } from 'console';
import { handleSuccess } from '@/hooks/handleSuccess';
import { data } from 'cypress/types/jquery';
import { handleResendEmail } from '@/hooks/handleResendEmail';
import { handleReject } from '@/hooks/handleReject';
import formatCurrency from '@/utils/formatCurrency';

const YourComponent = () => {
  const user = useAppSelector((state) => state.user);
  const [getData, setGetData] = useState<ITransaction[]>([]);
  const [getProperty, setProperty] = useState<IProperty[]>([]);
  console.log(getProperty);

  useEffect(() => {
    const handleGetData = async () => {
      const { data } = await axios.get(
        baseUrl + `/management/property/${user.id}`,
      );
      setGetData(data.data);
    };
    const handleGetDataProperty = async () => {
      const { data } = await axios.get(baseUrl + `/management/${1}`);
      setProperty(data.data);
    };
    handleGetData();
    handleGetDataProperty();
  }, []);

  const handleClick = () => {
    alert('User has not uploaded proof of payment');
  };

  return (
    <div className="relative p-[20px] rounded-[10px] mt-[20px] shadow-sm mb-8">
      <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
        {/* Dropdown di sini */}
        <select className="px-4 py-2 rounded-lg bg-gray-800 text-black">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <td className="text-black">Order Id</td>
            <td className="text-black">Status</td>
            <td className="text-black">Date</td>
            <td className="text-black">Amount</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {getData?.map((item) => {
            const date = new Date(`${item?.createdAt}`);
            const formatDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const monthName = formatDate.split(',')[0];
            let createdAt = `${date.getFullYear()} ${monthName}`;

            return (
              <tr key={item.id} className="border-b border-gray-300">
                <td className="h-16 text-black">{item.orderId}</td>

                <td>
                  <span
                    className={`rounded-lg p-2 text-[14px] text-black ${
                      item?.statusTransaction === 'CONFIRM'
                        ? 'bg-[#32a852]'
                        : item?.statusTransaction === 'REJECT'
                          ? 'bg-[#d32f2f]'
                          : item?.statusTransaction === 'EXPIRED'
                            ? 'bg-[#ffc107]'
                            : item?.statusTransaction === 'CANCEL'
                              ? 'bg-[#795548]'
                              : 'bg-[#1976d2]'
                    }`}
                  >
                    {item.statusTransaction}
                  </span>
                </td>
                <td className="text-black">{createdAt}</td>
                <td className="text-black">{formatCurrency(item.total)}</td>
                <td>
                  <div className="flex gap-[10px]">
                    {!item.paymentProof ? (
                      <button
                        className="py-[4px] px-[6px] text-black border-none cursor-pointer bg-[#f7cb7375] rounded-lg"
                        onClick={handleClick}
                      >
                        Detail
                      </button>
                    ) : (
                      <a
                        className="py-[4px] px-[6px] text-black border-none cursor-pointer bg-[#f7cb7375] rounded-lg"
                        href={`http://localhost:8000/payment-proof/${item.paymentProof}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Detail
                      </a>
                    )}

                    <button
                      onClick={() =>
                        handleSuccess(item.uuid, item.user.email, item.checkOut)
                      }
                      disabled={
                        item.statusTransaction === 'CONFIRM' ||
                        item.statusTransaction === 'EXPIRED' ||
                        item.statusTransaction === 'CANCEL' ||
                        item.statusTransaction === 'REJECT'
                      }
                      className={`py-[4px] px-[6px] text-black border-none cursor-pointer rounded-lg ${
                        item.statusTransaction === 'CONFIRM' ||
                        item.statusTransaction === 'EXPIRED' ||
                        item.statusTransaction === 'CANCEL' ||
                        item.statusTransaction === 'REJECT'
                          ? 'bg-gray-400'
                          : 'bg-teal-600'
                      }`}
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => handleReject(item.uuid, item.user.email)}
                      disabled={
                        item.statusTransaction === 'CONFIRM' ||
                        item.statusTransaction === 'REJECT' ||
                        item.statusTransaction === 'CANCEL'
                      }
                      className={`py-[4px] px-[6px] text-black border-none cursor-pointer rounded-lg ${
                        item.statusTransaction === 'CONFIRM' ||
                        item.statusTransaction === 'REJECT' ||
                        item.statusTransaction === 'CANCEL'
                          ? 'bg-gray-400'
                          : 'bg-red-600'
                      }`}
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleResendEmail(item.uuid)}
                      disabled={
                        !!item.paymentProof ||
                        item.statusTransaction === 'CANCEL' ||
                        item.statusTransaction === 'REJECT'
                      }
                      className={`py-[4px] px-[6px] text-black border-none cursor-pointer rounded-lg ${
                        !!item.paymentProof ||
                        item.statusTransaction === 'CANCEL' ||
                        item.statusTransaction === 'REJECT'
                          ? 'bg-gray-400'
                          : 'bg-[#FF9800]'
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
