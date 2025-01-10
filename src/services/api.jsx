import axios from 'axios';

const API_BASE_URL = "http://localhost:1608";

export const sendEmail = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sendemail`,
      data ,
      {withCredentials:true});
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
