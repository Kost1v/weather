'use client'
import axios from "axios";

const weatherInstance = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
  params: {
    appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
});


export const getCityWeather = async (q) => {  
  const {data} = await weatherInstance(`/weather?q=${q}&lang=ua&units=metric`);
  return data
  
}