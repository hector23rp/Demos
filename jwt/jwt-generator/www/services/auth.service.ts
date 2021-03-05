import axios from 'axios';
import qs from 'qs';

export const loginService = (username: String, password:String) => {
  return axios.post('/login', 
  qs.stringify({
    username,
    password
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}