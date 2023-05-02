import axios from 'axios';



export async function getUser (documentID) {
  try {
    const response = await axios.get(`/api/account/${documentID}`, {
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}