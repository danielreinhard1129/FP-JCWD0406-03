import axios from "axios";
import React, { useEffect, useState } from "react";
import PropertyCard from "./components/PropertyCard";

const Property = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/property/location/date"
        );
        setProperties(response.data.properties);
        console.log("ini adalah data  dari setProperties", setProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className=" pt-[5rem] bg-gray-200 pb-[4rem]">
        <h1 className=" heading">Best Room Property</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem] items-center w-[80%] mx-auto mt-[4rem]">
          {properties.map((property) => (
            <div key={property}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Property;
