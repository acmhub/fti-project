import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useGetProjectTasks from "../../../data/tasks/useGetProjectTasks";
import Modal from "../../../components/modal";
import Task from "./task";

function Tasks({ project_id }: { project_id: number }) {
	const { isLoading, tasksData } = useGetProjectTasks(project_id);
	const [tasks, setTasks] = useState<Task[]>();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setTasks(tasksData);
	}, [!isLoading]);

	async function addTask(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		formData.project_id = project_id.toString();

		if (formData.task.toString().length > 512) return toast.error("Summarise it.");

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/tasks/addTask.php`,
				{
					...formData,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log(response);

			if (response.data.status === 200) {
				toast.success(response.data.message);
				setIsOpen(false);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h5>Project Tasks</h5>

			<div className="my-5">
				{!isLoading ? (
					tasks && tasks.length > 0 ? (
						<div className="divide-y">
							{tasks.map((task) => (
								<Task task={task} key={task.id} />
							))}
						</div>
					) : (
						<div>
							<p>0 tasks found.</p>
						</div>
					)
				) : (
					<div className="loading-animation mx-auto" />
				)}
			</div>

			<button className="theme-button2 block w-fit mx-auto mt-5" onClick={() => setIsOpen(true)}>
				Add task
			</button>

			<Modal title="Add task" isOpen={isOpen} setIsOpen={setIsOpen}>
				<form onSubmit={addTask}>
					<textarea
						name="task"
						className="min-h-[200px] w-full bg-transparent border-b border-faded outline-none"
					/>

					<button className="theme-button1 block w-fit mx-auto mt-10" type="submit">
						Submit
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default Tasks;
