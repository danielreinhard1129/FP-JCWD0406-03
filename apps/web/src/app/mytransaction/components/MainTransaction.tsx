import { useState } from 'react';
import DateRangePicker from './DatePicker';
import { ITransaction } from '../../../../types/types';

const MainTransaction = ({ data }: any) => {
  const [getDate, setGetDate] = useState<ITransaction[]>([]);

  const handleGetDate = (date: any) => {
    setGetDate(date);
  };

  return (
    <div className="rounded-lg overflow-hidden mx-4 md:mx-10">
      <h1 className="text-2xl font-extrabold text-gray-800 py-4 px-6 lg:mt-10 md:mt-20 sm:mt-10 md:z-20">
        Transaction History
      </h1>
      <DateRangePicker onChange={handleGetDate} />
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
            {data?.map((item: any) => (
              <tr key={item.id}>
                <td className="py-2 px-6">{item.orderId}</td>
                <td className="py-2 px-6">{item?.room?.property?.name}</td>

                <td className="py-2 px-6">
                  Rp{item.total.toLocaleString('id-ID')}
                </td>
                <td
                  className={`rounded-lg p-2 text-[14px] text-black ${
                    item?.statusTransaction === 'CONFIRM'
                      ? 'text-[#32a852]'
                      : item?.statusTransaction === 'REJECT'
                        ? 'text-[#d32f2f]'
                        : item?.statusTransaction === 'EXPIRED'
                          ? 'text-[#ffc107]'
                          : item?.statusTransaction === 'CANCEL'
                            ? 'text-[#795548]'
                            : 'text-[#1976d2]'
                  }`}
                >
                  {item.statusTransaction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTransaction;
