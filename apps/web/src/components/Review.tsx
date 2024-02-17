import React from "react";
import ReviewSlider from "./helper/ReviewSlider";

const Review = () => {
  return (
    <div className=" pt-[6rem] pb-[3rem]">
      <h1 className="heading">Client Review</h1>
      <div className=" mt-[4rem] w-[80%] mx-auto">
        {/* review slider */}
        <ReviewSlider />
      </div>
    </div>
  );
};

export default Review;
