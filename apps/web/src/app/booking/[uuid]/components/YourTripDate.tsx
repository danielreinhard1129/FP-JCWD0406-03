import DateRangePicker from './DatePicker';

export default function YourTripDate() {
  return (
    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full shadow-lg">
      <div className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full ">
        <div className="pb-4 md:pb-8 w-full md:w-40">
          <img
            className="w-full hidden md:block"
            src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
            alt="dress"
          />
          <img
            className="w-full md:hidden"
            src="https://i.ibb.co/L039qbN/Rectangle-10.png"
            alt="dress"
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
                  Entire Villa ||{' '}
                </p>
                <div className="flex items-center ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.35L22 9.24l-5.27 5.12L19.64 22 12 18.31 4.36 22l1.91-7.64L2 9.24l6.91-1.89L12 2z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </div>
                <div className="gap-2 flex flex-row">
                  <p className="text-sm leading-none text-gray-800">4.84</p>
                  <p className="text-sm leading-none text-gray-800">
                    (262 Reviews)
                  </p>
                  <p className="text-sm leading-none text-gray-800">
                    Superhost
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-8 items-start w-full">
            <DateRangePicker />
            <p className="text-base xl:text-lg leading-6">Dates</p>
          </div>
        </div>
      </div>
    </div>
  );
}
