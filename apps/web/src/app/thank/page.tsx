/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useRouter } from 'next/navigation';

const Thank = () => {
  const router = useRouter();

  const handleGoBackHome = () => {
    router.replace('/');
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto relative">
        <div className="relative py-16 flex justify-center px-4 sm:px-0">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 xl:text-6xl font-serif !leading-tight">
              Dear user
            </h1>
            <p className="mt-4 text-lg sm:text-xl leading-8 text-gray-800 sm:px-16">
              Thank you for your order! We truly appreciate your trust in our
              services. To complete your payment, please check your email for
              further instructions. If you need any assistance or have any
              questions, feel free to contact us. We are here to help you. Thank
              you for your cooperation!
            </p>
            <div className="mt-8 flex w-full space-x-8 justify-center">
              <button
                className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent disabled:bg-gray-400 appearance-none text-white bg-primary hover:bg-lime-700 focus:ring-lime-500 focus:ring-offset-white"
                onClick={handleGoBackHome}
              >
                Go back home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thank;
