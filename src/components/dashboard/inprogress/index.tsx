import React, { useState, useEffect } from "react";
import useGetProjectsInProgress from "../../../data/projects/useGetProjectsInProgress";
import Project from "./project";

function InProgress() {
	let { isLoading, projectData } = useGetProjectsInProgress();
	const [projects, setProjects] = useState<ProjectCient[]>();

	useEffect(() => {
		setProjects(projectData);
	}, [!isLoading]);

	return (
		<div className="small-card">
			<h6>In Progress</h6>
			<div className="divider mb-2 mt-1" />

			<div className="divide-y">
				{!isLoading ? (
					projects && projects.length > 0 ? (
						projects.map((project) => <Project project={project} key={project.id} />)
					) : (
						<div>
							<p>0 projects in progress.</p>
						</div>
					)
				) : (
					<div className="loading-animation mx-auto" />
				)}
			</div>
		</div>
	);
}

export default InProgress;
