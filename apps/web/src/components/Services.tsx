import React from "react";
import CatergoryCard from "./helper/CatergoryCard";

function CategorySection() {
  const features = [
    {
      id: 0,
      iconUrl: "/images/satellite.png",
      title: "Calculated Weather",
      description:
        "Built Wicket longer admire do barton vanity itself do in it.",
      highlighted: false,
    },
    {
      id: 1,
      iconUrl: "/images/aircraft.png",
      title: "Best Flights",
      description:
        "Engrossed listening. Park gate sell they west hard for the.",
      highlighted: true,
    },
    {
      id: 2,
      iconUrl: "/images/mic.png",
      title: "Local Events",
      description:
        "Barton vanity itself do in it. Preferd to men it engrossed listening. ",
      highlighted: false,
    },
    {
      id: 3,
      iconUrl: "/images/cog.png",
      title: "Customization",
      description:
        "We deliver outsourced aviation services for military customers",
      highlighted: true,
    },
  ];
  return (
    <section className=" mb-8">
      <h1 className=" my-8 border-l-8 border-blue-900 py-2 pl-2 text-3xl font-bold">
        We Ofer Best Services
      </h1>
      <div className="flex flex-col gap-8 md:flex-row justify-between w-full mt-16">
        {features.map((feature) => (
          <CatergoryCard
            key={feature.id}
            iconUrl={feature.iconUrl}
            title={feature.title}
            description={feature.description}
            highlighted={feature.highlighted}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
