import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetClients() {
	const [isLoading, setIsLoading] = useState(true);
	const [clients, setClients] = useState([]);

	const getClients = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/clients/getClients.php`);

			if (response.status === 200) {
				setIsLoading(false);
				setClients(response.data);
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getClients();
	}, []);

	return { isLoading, clients };
}

export default useGetClients;
