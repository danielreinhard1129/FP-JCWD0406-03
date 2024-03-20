import React from "react";

const BannerPic = ({ img }: any) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
  };
  return (
    <div
      data-aos="zoom-in"
      className="h-[500px] w-full shadow-xl"
      style={bgImage}
    ></div>
  );
};

export default BannerPic;
