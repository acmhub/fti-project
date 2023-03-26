import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetProjectProgress(projectId: number) {
	const [isLoading, setIsLoading] = useState(true);
	const [progressData, setProgressData] = useState<number | null>();

	async function getProjectProgress() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/projects/getProjectProgress.php`,
				{
					projectId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				setProgressData(response.data.progress);
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
		getProjectProgress();
	}, []);

	return { isLoading, progressData };
}

export default useGetProjectProgress;
