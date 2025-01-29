import React from "react";
import { useContext } from "react";
import { AppContext } from "./ContextProvider";

function ExtractedNodeDetails() {
	const { nodes } = useContext(AppContext);

	const extractedDetails = nodes
		.slice(3)
		.map((node) => ({
			label: node.data?.label || null,
			title: node.data?.title || null,
		}))
		.filter((detail) => detail.label || detail.title);

	extractedDetails.map((detail, index) => (
		<li key={index}>
			<strong>Label:</strong> {detail.label || "N/A"} <br />
			<strong>Title:</strong> {detail.title || "N/A"}
		</li>
	));
}

export default ExtractedNodeDetails;
