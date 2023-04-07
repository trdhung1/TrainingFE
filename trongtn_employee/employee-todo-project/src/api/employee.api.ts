import axios from "./axios";
 
const employeeApi = {
    create(inputData: object) {
        const url = 'employees';
        return axios.post(url, inputData)
    },
    update(inputId: number, inputData: object) {
        const url = `employees/${inputId}`;
        return axios.put(url, inputData)
    },
    getEmployeeById(inputId: number) {
        const url = `employees/${inputId}`;
        return axios.get(url);
    },
    getAllEmployees() {
        const url = `employees`;
        return axios.get(url);
    },
    // getAllEmployeesByPage(inputPage: number) {
    //     const url = `employees?page=${inputPage}`;
    //     return axios.get(url);
    // },
    deleteEmployeeById(inputId: number) {
        const url = `employees/${inputId}`;
        return axios.delete(url);
    }
}

export default employeeApi;