import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetProjectPayments(project_id: number) {
	const [isLoading, setIsLoading] = useState(true);
	const [paymentsData, setPaymentsData] = useState<Payment[]>();

	async function getProjectPayments() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/payments/getProjectPayments.php`,
				{
					project_id,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				setPaymentsData(response.data);
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
		getProjectPayments();
	}, []);

	return { isLoading, paymentsData };
}

export default useGetProjectPayments;
