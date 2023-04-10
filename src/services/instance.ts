import axios, { AxiosInstance } from "axios";

 export const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8081",
  timeout: 10000,
});

export default instance;

export const authUrl: AxiosInstance = axios.create({
  baseURL: "http://localhost:8082",
  timeout: 10000,
});
