import React, { useState, useEffect } from "react";
import useGetClients from "../../../data/clients/useGetClients";
import useCompareWithPrevMonth from "../../../data/reports/useCompareWithPrevMonth";

function Clients() {
	const { isLoading: isClientsLoading, clients } = useGetClients();
	const { isLoading: isCompareLoading, comparisonData } = useCompareWithPrevMonth("clients");

	return (
		<div className="small-card">
			<h6>Clients</h6>
			<div className="divider mb-2 mt-1" />

			{!isClientsLoading ? (
				<div className="flex items-center justify-between">
					<h4>{clients?.length}</h4>

					{comparisonData && comparisonData !== 0 ? (
						<div
							className={`pill ${
								comparisonData > 0 ? "positive" : comparisonData === 0 ? "" : "negative"
							}`}
						>
							{comparisonData > 0
								? `+${Number(comparisonData).toFixed(2)}`
								: `-${Number(comparisonData).toFixed(2)}`}
							%
						</div>
					) : (
						<div className="pill bg-faded text-white">0%</div>
					)}
				</div>
			) : (
				<div className="loading-animation mx-auto" />
			)}

			<p className="text-xs text-right text-faded">compared to last month</p>
		</div>
	);
}

export default Clients;
