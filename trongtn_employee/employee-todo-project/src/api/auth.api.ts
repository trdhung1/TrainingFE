import axios from "axios";

const authApi = {
    login(inputData: object) {
        const url = 'login';
        return axios.post(url, inputData)
    },
}

export default authApi;