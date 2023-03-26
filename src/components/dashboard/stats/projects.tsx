import React from "react";
import useGetProjects from "../../../data/projects/useGetProjects";
import useCompareWithPrevMonth from "../../../data/reports/useCompareWithPrevMonth";

function Projects() {
	const { isLoading, projectData } = useGetProjects();
	const { isLoading: isCompareLoading, comparisonData } = useCompareWithPrevMonth("projects");

	return (
		<div className="small-card">
			<h6>Projects</h6>
			<div className="divider mb-2 mt-1" />

			{!isLoading ? (
				<div className="flex items-center justify-between">
					<h4>{projectData?.length}</h4>

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

export default Projects;
