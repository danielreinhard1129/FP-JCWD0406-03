"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ClientReview from "./ClientReview";
import axios from "axios";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 3,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1300, min: 764 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export interface ITeams {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  login: {
    uuid: string;
  };
  picture: {
    large: string;
  };
}

const ReviewSlider = () => {
  const [userData, setUserData] = useState<ITeams[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=6&nat=au"
        );
        const data: ITeams[] = response.data.results;

        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Carousel
      additionalTransfrom={0}
      arrows={true}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      infinite
      responsive={responsive}
      itemClass="item"
    >
      {userData &&
        userData.map((user: ITeams, index: number) => (
          <ClientReview
            key={index}
            image={user.picture.large}
            name={user.name.first}
          />
        ))}
    </Carousel>
  );
};

export default ReviewSlider;
