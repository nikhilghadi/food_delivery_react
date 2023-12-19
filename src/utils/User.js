import axios from 'axios';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const VerifyToken=(token)=>{
  return axios({
    headers: {
      authorization: `YoYo ${token}`,
    },
    method: 'GET',
    url:`${API_ENDPOINT}/api/verify_token`,
  })
}