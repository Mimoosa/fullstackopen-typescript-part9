import type { Diary, NewDiary } from "../types.ts";
import axios from "axios";

const baseUrl = "api/diaries";

const getAll = () => {
  try {
    return axios.get<Diary[]>(baseUrl).then((response) => response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

const create = (object: NewDiary) => {
  try {
    return axios.post<Diary>(baseUrl, object).then((response) => response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response;
    } else {
      throw error;
    }
  }
};

export default { getAll, create };
