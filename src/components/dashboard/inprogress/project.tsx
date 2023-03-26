import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import useGetProjectProgress from "../../../data/projects/useGetProjectProgress";
import getProgressColor from "../../../hooks/getPercentageColor";

function Project({ project }: { project: ProjectCient }) {
	const { id, project_name, first_name, last_name, company_name } = project;
	const { isLoading, progressData } = useGetProjectProgress(project.id);
	const [progress, setProgress] = useState<number | null>(0);

	useEffect(() => {
		setProgress(progressData as number | null);
	}, [!isLoading]);

	return (
		<div>
			<div className="relative card shadow-none rounded-none flex items-center p-2 my-2" key={id}>
				<div className="flex-1 flex items-center justify-between pr-2">
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

					{progress && <p>{progress}%</p>}
				</div>

				<div className="border-l border-l-faded pl-2">
					<Link to={`/project/${id}`}>
						<HiOutlineExternalLink className="h-4 w-4 cursor-pointer" />
					</Link>
				</div>

				{progress && (
					<div className="absolute bottom-0 left-0 w-full ">
						<div
							className="rounded-full py-0.5 px-px"
							style={{
								backgroundColor: getProgressColor(Number(progress)),
								width: `${Number(progressData)}%`,
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Project;
