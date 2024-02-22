import Image from 'next/image';
import HowToPay from './HowToPay';

export default function DetailPrice() {
  return (
    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
        <h3 className="text-xl font-semibold leading-5 text-gray-800">
          Summary
        </h3>
        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
          <div className="flex justify-between  w-full">
            <p className="text-base leading-4 text-gray-800">
              Rp.500,000 x 5 nights
            </p>
            <p className="text-base leading-4 text-gray-600">Rp.2,500,000</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800">Cleaning fee</p>
            <p className="text-base leading-4 text-gray-600">Rp,200.000</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800">
              Rumah123 service fee
            </p>
            <p className="text-base leading-4 text-gray-600">Rp,150.000</p>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base leading-4 text-gray-800">PPN</p>
            <p className="text-base leading-4 text-gray-600">Rp,100.000</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-base font-semibold leading-4 text-gray-800">
            Total
          </p>
          <p className="text-base font-semibold leading-4 text-gray-600">
            Rp.2,950.000
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold leading-5 text-gray-800">
            Choose how to pay
          </h3>
          <div className="ml-auto mr-4">
            <Image
              src={'/images/pay.svg'}
              alt="payment"
              width={180} // Sesuaikan ukuran gambar di sini
              height={100} // Sesuaikan ukuran gambar di sini
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex justify-between items-start w-full">
          <HowToPay />
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-blue-700 text-white shadow-2xl transition-all rounded-lg before:absolute before:h-0 before:w-0 before:rounded-full before:bg-yellow-500 before:duration-500 before:ease-out hover:shadow-yellow-500 hover:before:h-60 hover:before:w-full">
            <span className="relative z-10">Confirm and pay</span>
          </button>
        </div>
      </div>
    </div>
  );
}
