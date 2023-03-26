import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import Modal from "../../../components/modal";
import Status from "./status";
import useDeleteTask from "../../../data/tasks/useDeleteTask";

function Task({ task: { id, project_id, task, status, createdAt } }: { task: Task }) {
	const [isOpen, setIsOpen] = useState(false);

	async function modifyTask(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		formData.id = id.toString();

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/tasks/modifyTask.php`,
				{
					...formData,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsOpen(false);
				toast.success("Task modified.");

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const deleteTask = useDeleteTask(id);
	const handleDeleteTask = () => deleteTask();

	return (
		<div className="flex items-start space-x-4 px-1 py-4">
			<div className="flex-1">
				<Status id={id as number} status={status as string} endpoint="/tasks/changeTaskStatus.php" />

				<p className="text-sm text-faded">
					#{id} | {moment(createdAt).format("DD.MM.YYYY HH:MM")}
				</p>
				<p>{task}</p>
			</div>

			<div className="flex items-center space-x-2">
				<div className="hover-circle hover:bg-positive" onClick={() => setIsOpen(true)}>
					<MdOutlineEdit className="h-5 w-5" />
				</div>

				<div className="hover-circle hover:bg-negative" onClick={handleDeleteTask}>
					<MdOutlineDelete className="h-5 w-5" />
				</div>
			</div>

			<Modal title="Modify Task" isOpen={isOpen} setIsOpen={setIsOpen}>
				<form onSubmit={modifyTask} className="space-y-5">
					<textarea
						name="task"
						defaultValue={task}
						className="min-h-[200px] w-full bg-transparent border-b border-faded outline-none"
					/>

					<button className="theme-button2 block w-fit mx-auto" type="submit">
						Modify
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default Task;
