import axios from "axios";
import { toast } from "react-toastify";

function useDeleteTask(id: number) {
	const deleteTask = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/tasks/removeTask.php`,
				{
					id,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				toast.info("Task deleted.");

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return deleteTask;
}

export default useDeleteTask;
