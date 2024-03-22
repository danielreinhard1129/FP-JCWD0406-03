import React from "react";
import ReviewSlider from "./helper/ReviewSlider";

const Review = () => {
  return (
    <div className=" pt-[6rem] pb-[3rem]">
      <h1 className="my-8 border-l-8 border-blue-900 py-2 pl-2 text-3xl font-bold ">
        Client Review
      </h1>
      <div className=" mt-[4rem] w-[80%] mx-auto">
        {/* review slider */}
        <ReviewSlider />
      </div>
    </div>
  );
};

export default Review;
