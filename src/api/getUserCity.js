import axios from "axios";

export const getUserCity = async () => {
  const { data } = await axios.get("http://ip-api.com/json/");
  return data.city;
};
