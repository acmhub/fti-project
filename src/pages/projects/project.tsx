import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import getStatusColor from "../../hooks/getStatusColor";
import useGetProjectProgress from "../../data/projects/useGetProjectProgress";

function Project({ project, i }: { project: ProjectCient; i: number }) {
	const { id, project_name, first_name, last_name, company_name, status, value, discount, createdAt } = project;
	const { isLoading, progressData } = useGetProjectProgress(id);
	const [progress, setProgress] = useState<number | null>(null);

	useEffect(() => {
		setProgress(progressData as number | null);
	}, [!isLoading]);

	return (
		<tr className="hover:backdrop-blur-md duration-100" key={id}>
			<td>{i + 1}</td>
			<td>{project_name}</td>
			<td>{first_name ? first_name + " " + last_name : company_name}</td>
			<td>${value}</td>
			<td>{discount}%</td>
			<td>
				<div className="flex items-center space-x-1">
					<div
						className="rounded-full w-2 h-2"
						style={{
							backgroundColor: getStatusColor(status),
						}}
					/>
					<p className="capitalize">{status}</p>
				</div>
			</td>
			<td>{progress ? `${Number(progress).toFixed(0)}%` : "-"}</td>
			<td>{moment(createdAt).format("DD.MM.YYYY HH:mm")}</td>
			<td>
				<Link to={`/project/${id}`}>
					<HiOutlineExternalLink className="h-4 w-4 cursor-pointer" />
				</Link>
			</td>
		</tr>
	);
}

export default Project;
