// get users

import instance from '../instance'

export const getUsers = () => {
    return instance.get('/users')
}

