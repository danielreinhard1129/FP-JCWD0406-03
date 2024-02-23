import React from 'react';
import PaymentProof from './PaymentProof';

const CardPayment: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full shadow-lg">
      <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
        <div className="pb-4 md:pb-8 w-full md:w-40">
          <img
            className="w-full hidden md:block"
            src="https://loremflickr.com/g/320/240/team"
            alt="Team"
          />

          <img
            className="w-full md:hidden"
            src="https://loremflickr.com/g/320/240/team"
            alt="Team"
          />
        </div>
        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-8">
            <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
              Rusunawa BPJS
            </h3>
            <div className="flex justify-start items-start flex-col space-y-2">
              <div className="flex">
                <p className="text-sm leading-none text-gray-400">
                  Status transaction:{' '}
                  <span className="text-sm leading-none text-yellow-400">
                    PENDING
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-8 items-start w-full">
            <PaymentProof />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPayment;
