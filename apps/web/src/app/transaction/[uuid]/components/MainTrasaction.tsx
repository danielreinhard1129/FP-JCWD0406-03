'use client';
import Image from 'next/image';
import ClipBoard from './ClipBoard';
import { useEffect, useState } from 'react';
import { HiX } from 'react-icons/hi';
import { MdAnnouncement } from 'react-icons/md';
import { Banner, Card } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import PaymentProof from './PaymentProof';
import Countdown from './CountDown';
const MainTransaction = ({ data }: any) => {
  const [placeholder, setPlaceHolder] = useState<string>('Rp.0');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (data && data.total !== undefined) {
      setPlaceHolder(`Rp.${data?.total?.toLocaleString('id-ID')}`);
    }
  }, [data]);

  const handleInputChange = (data: any) => {
    setInput(data);
  };
  return (
    <Card className="font-[sans-serif] p-4 min-h-screen">
      <div className="lg:max-w-6xl max-w-xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 max-lg:order-1">
            <h2 className="text-3xl font-extrabold text-[#333]">
              Payment Instructions
            </h2>
            <Countdown input={input} />
            <p className="text-[#333] text-base mt-4">
              Complete your transaction swiftly and securely with our
              easy-to-use payment process.
            </p>
            <div className="mt-12 max-w-lg">
              <h2 className="text-lg font-extrabold text-[#333] mb-5">
                Transfer to
              </h2>
              <div className="flex flex-row  items-center gap-3  mb-4">
                <Image
                  src={'/images/bca.svg'}
                  alt="Payment Method"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <h2 className="text-sm font-semibold text-[#333] ">
                  BCA Virtual Account
                </h2>
              </div>
              <div className="grid gap-3">
                <ClipBoard />

                <label
                  htmlFor="amountInput"
                  className=" font-semibold text-[#333]"
                >
                  Total Payment
                </label>
                <input
                  type="text"
                  id="amountInput"
                  value={placeholder}
                  className="px-4 py-3.5 bg-gray-100 text-black w-full text-bold border rounded-md outline-none"
                  disabled
                  readOnly
                />
                <div className="bg-yellow-400 px-3 py-4 mx-2 my-4 rounded-md text-lg flex items-center  max-w-lg">
                  <div className="animate-ping absolute bg-red-600 rounded-full w-6 h-6"></div>
                  <HiInformationCircle className="mr-3 text-red-600 " />
                  <span className="text-sm">
                    Change a few things up and try submitting again.
                  </span>
                </div>
              </div>
              <PaymentProof data={data} onInputChange={handleInputChange} />
            </div>
          </div>
          <div className=" p-6 rounded-md">
            <Banner>
              <div className="flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
                <div className="mx-auto flex items-center">
                  <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    <MdAnnouncement className="mr-4 h-4 w-4" />
                    <span className="[&_p]:inline">
                      New brand identity has been launched for the&nbsp;
                      <a
                        href="https://flowbite.com"
                        className="decoration-600 dark:decoration-500 inline font-medium text-cyan-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"
                      >
                        Flowbite Library
                      </a>
                    </span>
                  </p>
                </div>
                <Banner.CollapseButton
                  color="gray"
                  className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
                >
                  <HiX className="h-4 w-4" />
                </Banner.CollapseButton>
              </div>
            </Banner>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MainTransaction;
