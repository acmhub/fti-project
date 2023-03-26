import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

function UsersTable({ users }: { users: User[] }) {
	const [isLoading, setIsLoading] = useState(false);

	async function setRole(id: number, role: string) {
		setIsLoading(true);

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/users/changeRole.php`,
				{
					id: id,
					role,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				window.location.reload();
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y-2 divide-faded text-sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Role</th>
						<th>Created At</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-faded">
					{users.map(({ id, username, createdAt, role }) => (
						<tr key={id}>
							<td>{id}</td>
							<td className="capitalize font-bold">{username}</td>
							<td className="uppercase ">{role}</td>
							<td>{moment(createdAt).format("DD.MM.YYYY HH:mm")}</td>
							<td>
								{role !== "admin" ? (
									<button
										className="theme-button1 bg-positive text-xs block w-fit ml-auto px-2"
										onClick={() => setRole(id, "admin")}
									>
										{!isLoading ? (
											<span>Promote</span>
										) : (
											<div className="loading-animation mx-auto" />
										)}
									</button>
								) : (
									<button
										className="theme-button1 bg-negative text-xs block w-fit ml-auto px-2"
										onClick={() => setRole(id, "user")}
									>
										{!isLoading ? (
											<span>Demote</span>
										) : (
											<div className="loading-animation mx-auto" />
										)}
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default UsersTable;
