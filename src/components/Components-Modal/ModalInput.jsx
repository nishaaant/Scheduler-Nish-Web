import React, { useContext } from "react";
import { AppContext } from "../ContextProvider";
import ModalLeadInput from "./ModalLeadInput";
import ModalEmailInput from "./ModalEmailInput";

const ModalInput = () => {
	const { modalData } = useContext(AppContext);

	return (
		<>
			{modalData.type === "addLeadSource" ? (
				<ModalLeadInput />
			) : (
				<ModalEmailInput />
			)}
		</>
	);
};

export default ModalInput;
