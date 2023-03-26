import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetRecentTasks() {
	const [isLoading, setIsLoading] = useState(true);
	const [tasks, setTasks] = useState<Task[]>();

	const getTasks = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/tasks/getRecentTasks.php`);

			if (response.status === 200) {
				setIsLoading(false);
				setTasks(response.data);
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
		getTasks();
	}, []);

	return { isLoading, tasks };
}

export default useGetRecentTasks;
