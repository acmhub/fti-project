import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/app";
import getStatusColor from "../hooks/getStatusColor";
import { Link } from "react-router-dom";
import { AiOutlineCheck, AiOutlineInfo } from "react-icons/ai";

function Tasks() {
	const [isLoading, setIsLoading] = useState(true);
	const [tasks, setTasks] = useState<Task[]>();

	const getTasks = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/tasks/getAllTasks.php`);

			if (response.status === 200) {
				setIsLoading(false);
				setTasks(response.data);
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getTasks();
	}, []);

	return (
		<Layout>
			{!isLoading ? (
				<>
					<h1 className="page-title">Tasks</h1>
					{tasks && tasks.length > 0 ? (
						<div className="divide-y">
							{tasks.map(({ id, project_id, task, status }) => (
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
							))}
						</div>
					) : (
						<p>0 tasks found.</p>
					)}
				</>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</Layout>
	);
}

export default Tasks;
