import React, { useContext } from 'react';
import { AppContext } from './ContextProvider';
import { sendEmail } from '../services/api'; // Adjust the path as per your file structure

function SendEmailComponent() {
  const { nodes } = useContext(AppContext);

  const handleSendEmail = async () => {
    // Transform nodes into the required format
    const emailData = nodes
      .slice(3) // Skip the first three nodes
      .map((node) => ({
        emailBody: node.data?.label || '', // Default to an empty string if label is missing
        subject: node.data?.title || '',  // Default to an empty string if title is missing
      }))
      .filter((item) => item.emailBody && item.subject); // Ensure both fields are not empty

    // Send each email individually
    for (const email of emailData) {
      try {
        const response = await sendEmail(email); // Send email one by one
        console.log("Email sent successfully:", response);
      } catch (error) {
        console.error(`Error sending email for data: ${JSON.stringify(email)}`, error);
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
