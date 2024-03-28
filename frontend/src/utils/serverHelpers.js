import axios from "axios";
import { backendURL } from "./config";
import Error from "../components/Error";

export const makePOSTRequest = async (route, body) => {
  try {
    const response = await axios.post(backendURL + route, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
};

export const makeGETRequest = async (route) => {
  try {
    const response = await axios.get(backendURL + route, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while processing your request.");
  }
};
