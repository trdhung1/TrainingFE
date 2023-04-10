import axios from "axios";

const authApi = {
  login(inputData: object) {
    const url = "https://reqres.in/api/login";
    return axios.post(url, inputData);
  },
};

export default authApi;
