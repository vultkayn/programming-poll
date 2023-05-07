import axios from 'axios';


export function createApiClient() {
  return axios.create({
    baseURL: "http://localhost:8888",
    headers: {
      "Content-Type": "application/json"
    },
    responseType: "json"
  })
}