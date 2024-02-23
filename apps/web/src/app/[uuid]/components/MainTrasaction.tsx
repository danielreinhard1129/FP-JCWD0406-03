import { IoIosArrowBack } from 'react-icons/io';
import CardPayment from './CardPayment';
const MainTransaction = () => {
  return (
    <div className="py-10 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex flex-row justify-start items-center gap-3">
        <button className="text-3xl">
          {' '}
          <IoIosArrowBack />
        </button>

        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
          Upload your payment proof
        </h1>
      </div>
      <CardPayment />
    </div>
  );
};

export default MainTransaction;
