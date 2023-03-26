import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

type TopProjectsData = {
	id: number;
	value: number;
	client: Client;
};

function TopProjects() {
	const [isLoading, setIsLoading] = useState(false);
	const [topProjects, setTopProjects] = useState<TopProjectsData[]>();

	async function getTopProjects() {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/reports/getTopProjects.php`);

			if (response.status === 200) {
				setTopProjects(response.data);
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
		getTopProjects();
	}, []);

	return (
		<div className="card space-y-2.5 p-2.5">
			<p className="text-xl">Top Projects</p>

			{!isLoading ? (
				<div className="divide-y divide-black dark:divide-white">
					{topProjects && topProjects.length > 0 ? (
						topProjects.map(({ id, value, client: { first_name, last_name, company_name } }) => (
							<div className="flex items-center justify-between py-2" key={id}>
								<div>
									<p>Project {id}</p>
									<p>{first_name ? first_name + " " + last_name : company_name}</p>
								</div>

								<div className="flex items-center divide-x">
									<p className="pr-4">${value}</p>
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

export default TopProjects;
