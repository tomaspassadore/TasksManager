import axios from './axios.js'

export const registerRequest = (user) => axios.post('/register', user)

export const loginRequest = (user) => axios.post('/login', user)

export const logoutRequest = () => axios.post('/logout')

export const verifyTokenRequest = () => axios.get('/verify')

export const updateProfileRequest = (id, field, data) => axios.put(`/profile/update/${field}/${id}`, data)

export const deleteProfileRequest = (id) => axios.delete(`/profile/delete/${id}`)
