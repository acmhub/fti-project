import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { RootState } from "../../redux";
import Layout from "../../components/app";
import UsersTable from "./usersTable";

function Users() {
	const isAdmin = useSelector((state: RootState) => state.isAdmin.isAdmin);
	let navigate = useNavigate();
	!isAdmin && navigate("/");

	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState([]);

	async function getUsers() {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/users/getAll.php`);

			if (response.status === 200) {
				setUsers(response.data);
				setIsLoading(false);
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

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<Layout>
			{!isLoading ? (
				<>
					<h1 className="page-title">Users</h1>
					{users && users.length > 0 ? <UsersTable users={users} /> : <p>No users found.</p>}
				</>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</Layout>
	);
}

export default Users;
