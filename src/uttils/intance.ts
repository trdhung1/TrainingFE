import axios from "axios";
import { IEmployee } from "../interface/employee.interface";

const instance = axios.create({
    baseURL: " http://localhost:3000",
    timeout: 10000,
    headers: { "Custom-header": "foo" }
})

export const getEmployeeApi = () => {
    return instance.get(`/Employee`);

};

export const createEmployeeApi = (data: any) => {
    return instance.post(`/Employee`, data);
};

export const putEmployeeApi = (id: number, data:IEmployee) => {

    return instance.put(`/Employee/${id}`, data)
};

export const deleteEmployeeApi = (id: number) => {
    return instance.delete(`/Employee/${id}`);
};
