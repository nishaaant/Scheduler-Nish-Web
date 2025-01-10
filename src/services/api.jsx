import axios from 'axios';

const API_BASE_URL = "http://localhost:1608";

export const sendEmail = async (data) => {
  try {
    const response = await axios.post("http://localhost:1608/sendemail",
      data ,
      {withCredentials:true});
    return response.data;
  } catch (error) {
    console.log(data)
    console.error("Error sending email:", error);
    throw error;
  }
};
