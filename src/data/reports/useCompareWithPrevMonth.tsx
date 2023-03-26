import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useCompareWithPrevMonth(type: string) {
	const [isLoading, setIsLoading] = useState(true);
	const [comparisonData, setComparisonData] = useState();

	const getComparisonWithPrevMonth = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/reports/compareWithPreviousMonth.php`,
				{
					type,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status === 200) {
				setComparisonData(response.data.difference);
				setIsLoading(false);
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
		getComparisonWithPrevMonth();
	}, [!isLoading]);

	return { isLoading, comparisonData };
}

export default useCompareWithPrevMonth;
