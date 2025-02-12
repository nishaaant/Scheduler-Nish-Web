import axios from "axios";

const API_BASE_URL = "https://schedulernish-be.onrender.com";

export const sendEmail = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL + "/sendemail", data, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.log(data);
		console.error("Error sending email:", error);
		throw error;
	}
};
