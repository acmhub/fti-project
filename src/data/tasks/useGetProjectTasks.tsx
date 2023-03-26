import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetProjectTasks(projectId: number) {
	const [isLoading, setIsLoading] = useState(true);
	const [tasksData, setTasksData] = useState<Task[]>();

	async function getProjectTasks() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/tasks/getProjectTasks.php`,
				{
					project_id: projectId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				setTasksData(response.data);
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
		getProjectTasks();
	}, []);

	return { isLoading, tasksData };
}

export default useGetProjectTasks;
