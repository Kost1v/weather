"use client";
import { useEffect, useState } from "react";
import { getCityWeather } from "../../api/city";

export default function Favorites() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites =
      JSON.parse(localStorage.getItem("savedCities")) || [];

    return [...new Set(savedFavorites)];
  });

  const handleDelete = (nameToDelete) => {
    const updatedCities = favorites.filter((name) => name !== nameToDelete);
    setFavorites(updatedCities);

    localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  };

  useEffect(() => {
    const getWeatherCity = async () => {
      if (favorites.length === 0) return;
      try {
        const weatherData = await Promise.all(
          favorites.map((favorite) => getCityWeather(favorite))
        );

        setCities(weatherData);
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherCity();
  }, [favorites]);
  return (
    <div>
      <h2 className="font-semibold text-[30px] leading-[1.2] text-gray-900 mb-4">
        Your Cities:
      </h2>
      {loading && (
        <h3 className="text-3xl font-semibold mt-2 caret-red-900">
          Loading...
        </h3>
      )}
      {error && error}
      {favorites.length == 0 && "You have not selected a city."}
      <ul className="flex gap-6 ">
        {favorites.length > 0 &&
          cities?.map((cityInfo) => {
            if (cityInfo !== null) {
              return (
                <li
                  key={cityInfo}
                  className="bg-green-700 text-white p-2 rounded-lg w-80 shadow-lg"
                >
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{cityInfo.name}</h2>
                      <p className="text-3xl font-semibold mt-2">
                        {cityInfo?.main?.temp}°C
                      </p>
                      <p className="text-lg">
                        {cityInfo?.weather[0]?.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(cityInfo.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
