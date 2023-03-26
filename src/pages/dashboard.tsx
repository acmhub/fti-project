import React from "react";
import Layout from "../components/app";
import {
	Projects,
	Clients,
	Earnings,
	InProgress,
	LatestProjects,
	LatestClients,
	TasksSummary,
} from "../components/dashboard";

function Dashboard() {
	return (
		<Layout>
			<h1 className="page-title">Dashboard</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				<Projects />
				<Clients />
				<Earnings />
			</div>

			<div className="my-5">
				<InProgress />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				<LatestProjects />
				<LatestClients />
				<TasksSummary />
			</div>
		</Layout>
	);
}

export default Dashboard;
