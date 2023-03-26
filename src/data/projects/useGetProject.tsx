import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function useGetProject(projectId: number) {
	const [isLoading, setIsLoading] = useState(true);
	const [projectData, setProjectData] = useState<Project>();
	const [clientData, setClientData] = useState<Client>();
	const [itemsData, setItemsData] = useState<Items>();

	async function getProject() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/projects/getProject.php`,
				{
					projectId: projectId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				setProjectData(response.data.project);
				setClientData(response.data.client);
				setItemsData(response.data.items);
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
		getProject();
	}, []);

	return { isLoading, projectData, clientData, itemsData };
}

export default useGetProject;
