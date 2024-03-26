/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';
import { handleRiview } from '@/hooks/handleRiview';
import { useAppSelector } from '@/lib/hooks';
import { baseUrl } from '@/utils/config';
import { StarIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CommentTenant from './CommentTenant';
import { ITransaction } from '../../../../../types/types';
const CommentAndRiview = ({ data }: any) => {
  const [rating, setRating] = useState(0); // Nilai awal rating
  const [value, setValue] = useState('');
  const [transaction, setTrasnaction] = useState<ITransaction[]>([]);
  const [review, setReview] = useState([]);
  const [reviewUserId, setReviewUserId] = useState(null);
  const user = useAppSelector((state) => state.user);

  console.log(
    'ini anak babi',
    review.map((i) => user.image),
  );

  const handleGetReview = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/review/all`);
      setReview(data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleGetReviewUserId = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/review/${user.id}`,
      );
      setReviewUserId(data.data);
    } catch (error) {
      throw error;
    }
  };
  console.log('asdsad', reviewUserId);

  const handleGetTransaction = async () => {
    try {
      const { data } = await axios.get(
        baseUrl + `/transaction/transaction-userid/${user.id}`,
      );
      setTrasnaction(data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleStarClick = (value: any) => {
    const newRating = value === 1 ? 1 : value;
    setRating(newRating);
  };
  useEffect(() => {
    handleGetTransaction();
    handleGetReview();
    handleGetReviewUserId();
  }, []);

  return (
    <div className="bg-white p-6">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
        {review.map((item: any) => {
          const ratingStars = [];
          for (let i = 0; i < item.rating; i++) {
            ratingStars.push(
              <StarIcon
                key={i}
                className="text-orange-600 w-[1rem] h-[1rem]"
              />,
            );
          }
          const date = formatDistance(new Date(item.createdAt), new Date(), {
            addSuffix: true,
          });
          return (
            <>
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex flex-row mb-2">
                  <Image
                    width={40}
                    height={40}
                    className="mr-2 rounded-full"
                    src={
                      item.user.image === null
                        ? '/images/no-profile.svg'
                        : `http://localhost:8000/photo-profile/${item.user.image}`
                    }
                    alt={''}
                  />
                  <h3 className="text-lg font-bold">{item.user.username}</h3>
                </div>

                <div className="flex flex-row items-center justify-start gap-2 text-2xl">
                  {ratingStars}
                </div>
                <p className="text-gray-700 text-sm mb-2">{date}</p>
                <p className="text-gray-700">{item.riview}</p>
                {user.roleId == 1 ? <CommentTenant item={item} /> : <div></div>}
              </div>
            </>
          );
        })}
      </div>
      {transaction[0]?.statusTransaction === 'CONFIRM' &&
      reviewUserId === null ? (
        <form className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Add a comment</h3>
          <div className="flex flex-row items-center justify-start gap-2 text-2xl">
            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                className={`text-${
                  rating >= value ? 'orange' : 'gray'
                }-600 w-[1rem] h-[1rem] cursor-pointer`}
                onClick={() => handleStarClick(value)}
              />
            ))}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              name="comment"
              onChange={(e) => setValue(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              rows={3}
              placeholder="Enter your comment"
            ></textarea>
          </div>
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() =>
              handleRiview(user.id, rating, data.property.id, value)
            }
          >
            Submit
          </button>
        </form>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CommentAndRiview;
