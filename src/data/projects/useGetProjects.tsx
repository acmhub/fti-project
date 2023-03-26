import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetProjects() {
	const [isLoading, setIsLoading] = useState(true);
	const [projectData, setProjectData] = useState<ProjectCient[]>();

	async function getProjects() {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/projects/getProjects.php`);

			if (response.status === 200) {
				setIsLoading(false);
				setProjectData(response.data);
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
		getProjects();
	}, []);

	return { isLoading, projectData };
}

export default useGetProjects;
