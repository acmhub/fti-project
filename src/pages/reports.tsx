import React from "react";
import Layout from "../components/app";
import DailyReport from "../components/reports/dailyreport";
import MostProjects from "../components/reports/mostprojects";
import TopPayments from "../components/reports/toppayments";
import TopProjects from "../components/reports/topprojects";

function Reports() {
	return (
		<Layout>
			<h1 className="page-title">Reports</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
				<TopProjects />
				<MostProjects />
				<TopPayments />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
				<DailyReport title="Clients" table="clients" />
				<DailyReport title="Projects" table="projects" />
				<DailyReport title="Payments" table="payments" />
			</div>
		</Layout>
	);
}

export default Reports;
