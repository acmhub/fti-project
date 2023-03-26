import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import useGetLatestProjects from "../../data/projects/useGetLatestProjects";

function LatestProjects() {
	let { isLoading, projects } = useGetLatestProjects();

	return (
		<div className="small-card h-fit">
			<h6>Latest Projects</h6>
			<div className="divider mt-1" />

			<div className="divide-y">
				{!isLoading ? (
					projects.length > 0 ? (
						projects.map(({ id, project_name, first_name, last_name, company_name }) => (
							<div className="flex items-center justify-between py-2 my-1" key={id}>
								<div>
									<p>
										<span className="text-faded">Project: </span>
										<span>{project_name}</span>
									</p>

									<p>
										<span className="text-faded">Client: </span>
										<span>{first_name ? first_name + " " + last_name : company_name}</span>
									</p>
								</div>

								<Link to={`/project/${id}`}>
									<HiOutlineExternalLink className="h-4 w-4 cursor-pointer" />
								</Link>
							</div>
						))
					) : (
						<div>
							<p>0 recent projects.</p>
						</div>
					)
				) : (
					<div className="loading-animation mx-auto" />
				)}
			</div>
		</div>
	);
}

export default LatestProjects;
