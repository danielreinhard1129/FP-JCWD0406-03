'use client';
import { useState } from 'react';

import { ITransaction } from '../../../../types/types';
import { useSearchParams } from 'next/navigation';

const DetailSearch = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;

  const encodedSearchQuery = encodeURI(searchQuery || '');

  console.log('riski babi', encodedSearchQuery);

  return (
    <div className="rounded-lg overflow-hidden mx-4 md:mx-10">
      <h1 className="text-2xl font-extrabold text-gray-800 py-4 px-6 lg:mt-10 md:mt-20 sm:mt-10 md:z-20">
        Transaction History
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                No order
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Destination
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Total
              </th>
              <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {/* {data?.map((item: any) => (
              <tr key={item.id}>
                <td className="py-2 px-6">{item.orderId}</td>
                <td className="py-2 px-6">{item?.room?.property?.name}</td>
                <td className="py-2 px-6">{item.total}</td>
                <td className="py-2 px-6">{item.statusTransaction}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailSearch;
