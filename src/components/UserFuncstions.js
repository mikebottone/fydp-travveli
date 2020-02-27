//register and login functions for the user
import axios from 'axios'

export const register = newUser => {
  return axios
  .post('users/register', {
    FirstName: newUser.FirstName,
    LastName: newUser.LastName,
    Email: newUser.Email,
    Password: newUser.Password
  })
  .then(res => {
    console.log(res.data)
    console.log("Registered")
  })
};

export const login = user => {
  return axios
  .post('users/login',{
    Email: user.Email,
    Password: user.Password
  })
  .then(res => {
    console.log(res.data)
    localStorage.setItem('usertoken', res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}
