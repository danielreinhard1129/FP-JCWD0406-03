/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { FaEnvelope } from 'react-icons/fa';
import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/utils/config';
import { StarIcon } from '@heroicons/react/16/solid';
import { formatDistance } from 'date-fns';
import { handleReply } from '@/hooks/handleReplyTenant';
import { useAppSelector } from '@/lib/hooks';

const ReplyReview = ({ item }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const user = useAppSelector((state) => state.user);
  const [getData, setGetData] = useState([]);
  const [value, setValue] = useState('');
  const [replyValue, setReplyValue] = useState<string[]>([]); // State untuk input reply

  const handleGetData = async (id: any) => {
    try {
      const { data } = await axios.post(baseUrl + `/review/property/${id}`);
      setGetData(data.data);
      setOpenModal(true);
    } catch (error) {
      throw error;
    }
  };

  console.log(item, 'asdasdsa');

  return (
    <>
      <Button
        key={item.id}
        className="bg-transparent"
        onClick={() => handleGetData(item.id)}
      >
        <FaEnvelope color="black" className="cursor-pointer" />
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="antialiased mx-auto max-w-screen-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Comments
            </h3>
            {getData.map((item: any, index) => {
              const ratingStars = [];
              for (let i = 0; i < item.rating; i++) {
                ratingStars.push(
                  <StarIcon
                    key={i}
                    className="text-orange-600 w-[1rem] h-[1rem]"
                  />,
                );
              }
              const date = formatDistance(
                new Date(item.createdAt),
                new Date(),
                {
                  addSuffix: true,
                },
              );
              return (
                <div key={index} className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <img
                        className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                        src={
                          item.user.image === null
                            ? '/images/no-profile.svg'
                            : `http://localhost:8000/photo-profile/${item.user.image}`
                        }
                        alt=""
                      />
                    </div>
                    <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                      <strong>{item.user.username}</strong>{' '}
                      <span className="text-xs text-gray-400">{date}</span>
                      <div className="flex flex-row items-center justify-start gap-2 text-2xl">
                        {ratingStars}
                      </div>
                      <p className="text-sm">{item.riview}</p>
                      <div className="flex">
                        <div className="flex space-x-2 mt-3 mb-3">
                          <input
                            type="text"
                            key={index}
                            name={`comment-${index}`} // Gunakan index untuk nama input yang unik
                            value={replyValue[index] || ''} // Ambil value dari state yang sesuai dengan index
                            onChange={(e) => {
                              const newValue = [...replyValue]; // Buat salinan array state
                              newValue[index] = e.target.value; // Perbarui nilai state yang sesuai dengan index
                              setReplyValue(newValue); // Perbarui state
                            }}
                            className="flex-1 py-1 px-2 bg-white border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:border-blue-500 text-xs"
                            placeholder="Enter your reply"
                          />
                          <button
                            onClick={() =>
                              handleReply(
                                item.id,
                                item.user.id,
                                user.username,
                                replyValue[index],
                                item.image,
                              )
                            }
                            type="submit"
                            className="py-1 px-3 bg-primary text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 text-xs"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs"></h4>
                      <div className="space-y-4">
                        <div className="flex">
                          {item.TenantReply.map((e: any) => {
                            return (
                              <>
                                <div className="flex-shrink-0 mr-3">
                                  <img
                                    className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                                    src={
                                      user.image === null
                                        ? '/images/no-profile.svg'
                                        : `http://localhost:8000/photo-profile/${user.image}`
                                    }
                                    alt=""
                                  />
                                </div>
                                <div
                                  key={e.id}
                                  className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed"
                                >
                                  <strong>{e.usernameTenant}</strong>
                                  <span className="text-xs text-gray-400">
                                    {formatDistance(
                                      new Date(e.createdAt),
                                      new Date(),
                                      {
                                        addSuffix: true,
                                      },
                                    )}
                                  </span>
                                  <p className="text-xs sm:text-sm">
                                    {e.reply}
                                  </p>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="red" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReplyReview;
