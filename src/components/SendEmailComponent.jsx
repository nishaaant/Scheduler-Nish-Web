import React, { useContext } from "react";
import { AppContext } from "./ContextProvider";
import { sendEmail } from "../services/api";

function SendEmailComponent() {
	const { nodes } = useContext(AppContext);

	const handleSendEmail = async () => {
		const emailData = nodes
			.slice(3)
			.map((node) => ({
				emailBody: node.data?.label || "",
				subject: node.data?.title || "",
			}))
			.filter((item) => item.emailBody && item.subject);

		for (const email of emailData) {
			try {
				const response = await sendEmail(email);
				console.log("Email sent successfully:", response);
			} catch (error) {
				console.error(
					`Error sending email for data: ${JSON.stringify(email)}`,
					error
				);
			}
		}
	};

	return (
		<div className="absolute top-6 right-6">
			<button
				onClick={handleSendEmail}
				className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
			>
				Save & Schedule
			</button>
		</div>
	);
}

export default SendEmailComponent;
