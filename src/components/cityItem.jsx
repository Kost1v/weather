"use client";
import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
const CityItem = ({ city }) => {
  const [favorite, setFavorite] = useState(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("savedCities")) || [];
    return savedFavorites.includes(city.name);
  });

  useEffect(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("savedCities")) || [];

    if (favorite) {
      const updatedFavorites = [...savedFavorites, city.name];
      localStorage.setItem("savedCities", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = savedFavorites.filter(
        (name) => name !== city.name
      );
      localStorage.setItem("savedCities", JSON.stringify(updatedFavorites));
    }
  }, [favorite, city.name]);
  const checkboxChange = (event) => {
    console.log(event.target.checked);
    setFavorite(event.target.checked);
  };
  return (
    <div className="flex justify-between bg-green-700 text-white p-2 rounded-lg w-80 shadow-lg">
      <div>
        <h2 className="text-2xl font-bold">{city.name}</h2>
        <p className="text-3xl font-semibold mt-2">{city?.main?.temp}°C</p>
        <p className="text-lg">{city?.weather[0]?.description}</p>
      </div>
      <label>
        {favorite ? <FaStar /> : <FaRegStar />}
        <input
          className="sr-only"
          type="checkbox"
          name="favorite"
          checked={favorite}
          onChange={checkboxChange}
        ></input>
      </label>
    </div>
  );
};

export default CityItem;
