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
    var msg = JSON.parse(JSON.stringify(res.data));
    if(msg.status === "User already exists"){
      console.log(msg.status)
      return msg.status;
    }
    else{
      console.log(msg.status)
      return msg.status;
    }

  })
};

export const login = user => {
  return axios
  .post('users/login',{
    Email: user.Email,
    Password: user.Password
  })
  .then(res => {
    var msg = JSON.parse(JSON.stringify(res.data));
    if(msg.status === 'Invalid Email or Password'){
      return msg.status;
    }
    else{
      console.log(res.data)
      localStorage.setItem('usertoken', res.data)
      return res.data;
    }
  })
  .catch(err => {
    console.log(err)
  })
}
