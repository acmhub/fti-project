import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import type { RootState } from "../redux";
import { setIsAdmin } from "../redux/slices/isAdmin";

function useIsAdmin() {
	const isAdmin = useSelector((state: RootState) => state.isAdmin);
	const dispatch = useDispatch();
	const [cookies, setCookie] = useCookies(["user"]);
	const id = Number(cookies?.user?.userId);

	async function checkUser() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/users/isAdmin.php`,
				{
					id: id,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				response.data[0].role === "admin" ? dispatch(setIsAdmin(true)) : dispatch(setIsAdmin(false));
			} else {
				setIsAdmin(false);
				console.log(response.data.message);
			}
		} catch (error) {
			dispatch(setIsAdmin(false));
		}
	}

	useEffect(() => {
		checkUser();
	}, []);

	return isAdmin;
}

export default useIsAdmin;
