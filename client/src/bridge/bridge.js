import axios from 'axios';


export function createApiClient() {
  return axios.create({
    headers: {
      "Content-Type": "application/json"
    },
    baseURL: "http://127.0.0.1:8888/",
  })
}