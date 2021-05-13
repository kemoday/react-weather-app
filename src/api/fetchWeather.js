import axios from "axios";

const url = "https:\\api.openweathermap.org/data/2.5/weather?";
const API_KEY = "adf904d530f19cacfb70942375fb20c6";

export const fetchWeather = async (query) => {
  const { data } = await axios.get(url, {
    params: {
      q: query,
      units: "metric",
      appid: API_KEY,
    },
  });

  return data;
};
