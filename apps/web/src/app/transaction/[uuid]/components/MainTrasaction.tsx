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
import { useRouter } from 'next/navigation';
const MainTransaction = ({ data }: any) => {
  const [placeholder, setPlaceHolder] = useState<string>('Rp.0');
  const [input, setInput] = useState('');
  const router = useRouter();
  useEffect(() => {
    if (
      data?.statusTransaction === 'PROCESS' ||
      data?.statusTransaction === 'CANCEL'
    ) {
      router.replace('/');
    }
    if (data && data.total !== undefined) {
      setPlaceHolder(`Rp.${data?.total?.toLocaleString('id-ID')}`);
    }
  }, [data]);

  const handleInputChange = (data: any) => {
    setInput(data);
  };
  return (
    <div className="p-10">
      <h2 className="text-3xl font-extrabold text-[#333]">
        Payment Instructions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="lg:max-w-6xl max-w-xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-lg:order-1">
              <Countdown data={data} />
              <p className="text-[#333] text-base mt-4">
                Complete your transaction swiftly and securely with our
                easy-to-use payment process.
              </p>
              <div className="mt-12 max-w-lg">
                <h2 className="text-lg font-extrabold text-[#333] mb-5">
                  Transfer to
                </h2>

                <PaymentProof data={data} onInputChange={handleInputChange} />
              </div>
            </div>
          </div>
        </div>

        <aside className="">
          <div className="bg-gray-100 p-8 rounded">
            <h2 className="font-bold text-2xl">Instructions</h2>
            <ul className="list-disc mt-4 list-inside">
              <li>
                Press the upload payment proof button and the modal will appear
                upload proof of payment!
              </li>
              <li>
                If you press the cancel order button, you will automatically
                will exit this page and the payment status will be cancel!
              </li>
              <li>
                If you don t upload proof of payment for 1 hour then it will
                automatically Your payment has expired
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MainTransaction;
