import React from "react";

const BannerPic = ({ img }: any) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
  };
  return (
    <div className="  flex items-center p-16  justify-center">
      <div
        data-aos="zoom-in"
        className="h-[500px] w-full shadow-xl rounded-lg p-8"
        style={bgImage}
      ></div>
    </div>
  );
};

export default BannerPic;
