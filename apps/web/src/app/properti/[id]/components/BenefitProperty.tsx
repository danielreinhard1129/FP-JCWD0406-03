import Image from "next/image";
import React from "react";
import { MdHealthAndSafety } from "react-icons/md";

const BenefitProperty = () => {
  return (
    <div className=" text-[14px] md:text-[16px] gap-6">
      <div className=" mb-2">
        <h1 className="font-bold text-[25px] text-[#383746]">
          Yang kamu dapatkan Di Rumah.123
        </h1>
        <div className="flex items-start space-x-2 mb-3">
          <Image
            src={"/images/asuransi.png"}
            alt="assuransi"
            height={40}
            width={40}
          />
          <div>
            <h2 className="font-semibold text-[18px] text-[#303030]">
              Asuransi Khusus Penyewa
            </h2>
            <p className=" text-[13px] text-[#757575]">
              Perlindungan selama menginap atas kompensasi kehilangan barang dan
              kerusakan fasilitas pada unit kamar. Disediakan oleh PT Rumah.123
              Eastern Insurance Indonesia. Syarat & Ketentuan berlaku.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2 mb-3">
          <Image
            src={"/images/services.png"}
            alt="assuransi"
            height={40}
            width={40}
          />
          <div>
            <h2 className="font-semibold text-[18px] text-[#303030]">
              Pro Service
            </h2>
            <p className=" text-[13px] text-[#757575]">
              Ditangani secara profesional oleh tim Mamikos. Selama kamu ngekos
              di sini, ada tim dari Mamikos yang akan merespon saran dan
              komplainmu.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2 mb-3">
          <Image
            src={"/images/dikelola.png"}
            alt="assuransi"
            height={40}
            width={40}
          />
          <div>
            <h2 className="font-semibold text-[18px] text-[#303030]">
              Dikelola Rumah.123, Terjamin Nyaman
            </h2>
            <p className=" text-[13px] text-[#757575]">
              Property ini operasionalnya dikelola dan distandardisasi oleh
              Rumah.123
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2 mb-3">
          <Image
            src={"/images/free.png"}
            alt="assuransi"
            height={40}
            width={40}
          />

          <div>
            <h2 className="font-semibold text-[18px] text-[#303030]">
              Bebas Biaya Admin
            </h2>
            <p className=" text-[13px] text-[#757575]">
              Kamu tidak akan dikenakan biaya admin saat melakukan pembayaran di
              Rumah.123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitProperty;
