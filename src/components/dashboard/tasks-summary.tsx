import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineInfo, AiOutlineCheck } from "react-icons/ai";
import useGetRecentTasks from "../../data/tasks/useGetRecentTasks";
import getStatusColor from "../../hooks/getStatusColor";

function TasksSummary() {
	let { isLoading, tasks } = useGetRecentTasks();

	return (
		<div className="small-card h-fit">
			<h6>Tasks Summary</h6>
			<div className="divider mb-2 mt-1" />

			<div className="divide-y">
				{!isLoading ? (
					tasks && tasks.length > 0 ? (
						tasks.map(({ id, project_id, task, status }) => (
							<div className="py-2 my-1" key={id}>
								<div className="flex items-center justify-between space-x-4">
									<div>
										<p className="text-faded italic">#{id}</p>

										<div className="flex items-center space-x-2">
											<div
												className="rounded-full w-1.5 h-1.5"
												style={{
													backgroundColor: getStatusColor(status),
												}}
											/>
											<p className="flex-1 line-clamp-2">{task}</p>
										</div>
									</div>

									<div className="flex flex-col items-center space-y-1">
										<Link
											to={`/project/${project_id}`}
											className="hover:bg-faded hover:text-white rounded-full cursor-pointer p-1"
										>
											<AiOutlineInfo className="h-4 w-4" />
										</Link>

										<div className="hover:bg-positive hover:text-white rounded-full cursor-pointer p-1">
											<AiOutlineCheck className="h-4 w-4" />
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div>
							<p>0 tasks found.</p>
						</div>
					)
				) : (
					<div className="loading-animation mx-auto" />
				)}
			</div>
		</div>
	);
}

export default TasksSummary;
