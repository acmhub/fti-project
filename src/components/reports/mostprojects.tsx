import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

type MostProjectsData = {
	id: number;
	project_count: number;
	client: Client;
};

function MostProjects() {
	const [isLoading, setIsLoading] = useState(false);
	const [mostProjects, setMostProjects] = useState<MostProjectsData[]>();

	async function getMostProjects() {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/reports/getMostProjects.php`);

			if (response.status === 200) {
				setMostProjects(response.data);
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
	}

	useEffect(() => {
		getMostProjects();
	}, []);

	return (
		<div className="card space-y-2.5 p-2.5">
			<p className="text-xl">Most Projects</p>

			{!isLoading ? (
				<div className="divide-y divide-black dark:divide-white">
					{mostProjects && mostProjects.length > 0 ? (
						mostProjects.map(({ id, project_count, client: { first_name, last_name, company_name } }) => (
							<div className="flex items-center justify-between py-2" key={id}>
								<span>{first_name ? first_name + " " + last_name : company_name}</span>
								<div className="flex items-center divide-x">
									<p className="text-lg pr-4">#{project_count}</p>
									<Link className="cursor-pointer pl-4" to={`/project/${id}`}>
										<HiOutlineExternalLink className="h-4 w-4" />
									</Link>
								</div>
							</div>
						))
					) : (
						<li>No projects found.</li>
					)}
				</div>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</div>
	);
}

export default MostProjects;
