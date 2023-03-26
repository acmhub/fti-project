import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import Layout from "../../../components/app";
import useGetProject from "../../../data/projects/useGetProject";
import Tasks from "./tasks";
import Status from "./status";
import Payments from "./payments";

function ProjectPage() {
	const { projectId } = useParams();
	const { isLoading, projectData, clientData, itemsData } = useGetProject(Number(projectId));
	const [project, setProject] = useState<Project>();
	const [client, setClient] = useState<Client>();
	const [items, setItems] = useState<Items>();

	useEffect(() => {
		setProject(projectData);
		setClient(clientData);
		setItems(itemsData);
	}, [!isLoading]);

	return (
		<Layout>
			{!isLoading ? (
				<React.Fragment>
					{project && (
						<React.Fragment>
							<h6>Status:</h6>
							<Status
								id={project.id}
								status={project.status}
								endpoint="/projects/changeProjectStatus.php"
							/>
						</React.Fragment>
					)}

					<div>
						<p className="text-faded text-xs space-x-1">
							<span>#</span>
							<span>{projectId}</span>
						</p>
						<h1 className="text-2xl">{project?.project_name}</h1>
					</div>

					<div className="text-sm mt-2.5">
						<p>Created at: {moment(project?.createdAt).format("DD.MM.YYY - HH:MM")}</p>
						<p>
							Client:{" "}
							{client?.first_name ? client?.first_name + " " + client?.last_name : client?.company_name}
						</p>
					</div>

					<div className="divider my-5" />

					{items && items.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y-2 divide-faded text-sm">
								<thead>
									<tr className="text-base">
										<th>#</th>
										<th>Service</th>
										<th>Value</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-faded">
									{items.map(({ service, value }, i) => (
										<tr className="text-base" key={i}>
											<td>{i + 1}</td>
											<td>{service}</td>
											<td>${value}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<p className="mb-8">Item list empty.</p>
					)}

					{items && items.length > 0 ? (
						<div className="text-right space-y-1 my-8">
							<p>Discount: {project?.discount}%</p>
							{Number(project?.discount) > 0 && (
								<p className="text-faded line-through">Total: ${project?.value}</p>
							)}
							<h6>
								Total: ${(Number(project?.value) * (1 - Number(project?.discount) / 100)).toFixed(2)}
							</h6>
						</div>
					) : null}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
						<div className="card h-fit p-4">
							<Tasks project_id={Number(projectId)} />
						</div>

						<div className="card h-fit p-4">
							<Payments total={project?.value as number} project_id={Number(projectId)} />
						</div>
					</div>
				</React.Fragment>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</Layout>
	);
}

export default ProjectPage;
