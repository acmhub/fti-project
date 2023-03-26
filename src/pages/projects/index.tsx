import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/app";
import Project from "./project";

function Projects() {
	const [isLoading, setIsLoading] = useState(true);
	const [projects, setProjects] = useState([]);

	const getProjects = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/projects/getAllProjects.php`);

			if (response.status === 200) {
				setIsLoading(false);
				setProjects(response.data);
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
		getProjects();
	}, []);

	return (
		<Layout>
			{!isLoading ? (
				<>
					<h1 className="page-title">Projects</h1>
					{projects && projects.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y-2 divide-faded text-sm">
								<thead>
									<tr>
										<th>#</th>
										<th>Project Name</th>
										<th>Client</th>
										<th>Evaluation</th>
										<th>Discount</th>
										<th>Status</th>
										<th>Progress</th>
										<th>Created At</th>
										<th></th>
									</tr>
								</thead>
								<tbody className="divide-y divide-faded">
									{projects.map((project: ProjectCient, i) => (
										<Project project={project} key={project?.id} i={i} />
									))}
									<tr>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					) : (
						<p>0 projects found.</p>
					)}
				</>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</Layout>
	);
}

export default Projects;
