import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetClient(clientId: number) {
	const [isLoading, setIsLoading] = useState(true);
	const [clientData, setClientData] = useState<Client | any>(null);

	async function getClient() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/clients/getClient.php`,
				{
					clientId: clientId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				setClientData(response.data[0]);
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getClient();
	}, []);

	return { isLoading, clientData };
}

export default useGetClient;
