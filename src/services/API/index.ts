// get users

import {instance} from '../instance'
import {IEmployee} from '../../store/employeeSlice'

export const getUsers = () => {
    return instance.get('/users')
}

export const addUser = (user: IEmployee) => {
    return instance.post('/users', user)
}

export const updateUser = (user: IEmployee) => {
    return instance.put(`/users/${user.id}`, user)
}



export const deleteUser = (id: number) => {
    return instance.delete(`/users/${id}`)
}
