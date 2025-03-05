"use client";
import { useEffect, useState } from "react";
import { getCityWeather } from "../api/city";
import CityItem from "@/components/cityItem";
import PopularCities from "@/components/popularCities";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [city, setCity] = useState(null);

  const onSearch = (e) => {
    e.preventDefault();
    const queryTerm = e.target.elements.search.value;
    router.push(`?q=${queryTerm}`);
    e.target.elements.search.value = ''
  };
  
  const searchQuery = searchParams.get("q");

  useEffect(() => {
    const getWeatherCity = async () => {
      if (searchQuery === null) {
        return;
      }
      try {
        const data = await getCityWeather(searchQuery);
        setCity(data);
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherCity();
  }, [searchQuery]);
  return (
    <div>
      <form onSubmit={onSearch} className="mb-4">
        <label>
          <input
            type="text"
            name="search"
            placeholder="Search city"
            className="font-medium text-[14px] leading-[1.43] text-gray-500 bg-gray-50 border border-gray-300 rounded w-[455px] h-11 py-2.5 px-5 mr-2"
          />
        </label>
        <button
          type="submit"
          className="py-2.5 px-5 bg-gray-900 text-zinc-50 text-base text-center font-medium rounded hover:bg-gray-800 active:bg-gray-950"
        >
          Search city
        </button>
      </form>
      <div>{city !== null && <CityItem city={city} />}</div>
      <PopularCities />
    </div>
  );
}
