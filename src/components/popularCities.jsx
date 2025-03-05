import { getCityWeather } from "@/api/city";
import { useEffect, useState } from "react";

const nameCities = ["Kyiv", "London", "Berlin", "Lviv"];
const PopularCities = () => {
  const [cities, setCities] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  useEffect(() => {
    const getPopularWeatherCity = async () => {
      try {
        setError(null)
        setLoading(true)
        const weatherData = await Promise.all(
          nameCities.map((city) => getCityWeather(city))
        );
        setCities(weatherData);
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    };
    getPopularWeatherCity();
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-bold mt-2">Popular cities</h2>
      {loading && <h3 className="text-3xl font-semibold mt-2 caret-red-900">Loading...</h3>}
      {error && error}

      <ul className="flex gap-6 mt-4">
        {cities !== null &&
          cities?.map((cityInfo) => {
            if (cityInfo !== null) {
              return (
                <li
                  key={cityInfo.name}
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
                      {/* <Image
                        src={`https://openweathermap.org/img/wn/${cityInfo?.weather[0]?.icon}.png`}
                        alt="Weather Icon"
                        width={50}
                        height={50}
                      /> */}
                    </div>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default PopularCities;
