import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetReport(table: string, days: number) {
	const [isLoading, setIsLoading] = useState(true);
	const [reportsData, setReportsData] = useState<any>();

	const getReport = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/reports/entriesPerDay.php`,
				{
					table: table,
					daysAgo: days,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status === 200) {
				setReportsData(response.data.report);
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
		getReport();
	}, [!isLoading, days]);

	return { isLoading, reportsData };
}

export default useGetReport;
