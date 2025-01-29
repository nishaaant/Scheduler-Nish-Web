import "@xyflow/react/dist/style.css";
import { useContext } from "react";
import { AppContext } from "./components/ContextProvider";
import Modal from "./components/Components-Modal/Modal";
import ErrorModal from "./components/Components-Modal/ErrorModal";
import SendEmailComponent from "./components/SendEmailComponent";
import FlowChart from "./components/FlowChart";

function App() {
	const { modalOpen, errorModal, nodes } = useContext(AppContext);

	return (
		<>
			<div className="h-screen">
				<FlowChart />
				<SendEmailComponent />
			</div>
			{modalOpen && <Modal />}
			{errorModal && <ErrorModal />}
		</>
	);
}

export default App;
