import Image from 'next/image';

/* eslint-disable react/no-unescaped-entities */
const HowToPay = () => {
  return (
    <>
      <div className="max-w-lg mx-auto">
        <fieldset className="mb-5">
          <legend className="sr-only">Payment Method</legend>

          <div className="flex items-center mb-4 gap-2">
            <input
              id="country-option-1"
              type="radio"
              name="countries"
              value="USA"
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="country-option-1"
              aria-describedby="country-option-1"
            />
            <Image
              src={'/images/bca.svg'}
              alt="payment"
              width={50} // Ubah ukuran gambar di sini
              height={50} // Ubah ukuran gambar di sini
            />
          </div>

          <div className="flex items-center mb-4 gap-2">
            <input
              id="country-option-2"
              type="radio"
              name="countries"
              value="Germany"
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="country-option-2"
              aria-describedby="country-option-2"
            />
            <Image
              src={'/images/bni.svg'}
              alt="payment"
              width={50} // Ubah ukuran gambar di sini
              height={50} // Ubah ukuran gambar di sini
            />
          </div>

          <div className="flex items-center mb-4 gap-2">
            <input
              id="country-option-3"
              type="radio"
              name="countries"
              value="Spain"
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="country-option-3"
              aria-describedby="country-option-3"
            />
            <Image
              src={'/images/mandiri.svg'}
              alt="payment"
              width={50} // Ubah ukuran gambar di sini
              height={50} // Ubah ukuran gambar di sini
            />
          </div>

          <div className="flex items-center mb-4 gap-2">
            <input
              id="country-option-4"
              type="radio"
              name="countries"
              value="United Kingdom"
              className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
              aria-labelledby="country-option-4"
              aria-describedby="country-option-4"
            />
            <Image
              src={'/images/paypal.svg'}
              alt="payment"
              width={50} // Ubah ukuran gambar di sini
              height={50} // Ubah ukuran gambar di sini
            />
          </div>
        </fieldset>

        <p className="mt-5">
          Make sure your transactions are secure with trusted connections.
          Verify site identity and authenticity. Explore further on official
          channels.
          <a
            className="text-blue-600 hover:underline"
            href="https://www.ojk.go.id/id/Default.aspx"
            target="_blank"
          >
            Financial Services Authority (OJK) Supervision Guidelines
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default HowToPay;
