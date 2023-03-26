import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.svg";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

function Signup() {
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(["user"]);
	let isLoggedIn = useIsLoggedIn();
	const [isLoading, setIsLoading] = useState(false);
	const [isTypePassword, setIsTypePassword] = useState(true);

	useEffect(() => {
		isLoggedIn && navigate("/");
	}, [isLoggedIn]);

	const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);

		if (formData.username === "") {
			setIsLoading(false);
			return toast.error("Username can not be empty");
		}
		if (formData.password === "") {
			setIsLoading(false);
			return toast.error("Password can not be empty");
		}

		try {
			const response = await axios.post(`${process.env.REACT_APP_DB_API}/auth/signup.php`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.data.status === "success") {
				setIsLoading(false);
				navigate("/");
				setCookie(
					"user",
					{
						isLoggedIn: true,
						userId: response.data.user.id,
						username: formData.username,
					},
					{
						path: "/",
					}
				);
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			toast.error("An error occurred");
			setIsLoading(false);
		}
	};

	return !isLoggedIn ? (
		<div className="relative min-h-screen flex items-center justify-center py-10">
			<div className="card max-w-xs mx-2 dark:text-white">
				<div className="h-24 w-24 rounded-full border mx-auto mb-2.5 p-2.5">
					<img src={Logo} alt="logo" className="h-full w-full object-contain" loading="eager" />
				</div>

				<h4 className="text-center mb-5">Sign up</h4>

				<form onSubmit={handleSubmit}>
					<div>
						<input
							type="text"
							name="username"
							id="username"
							className="bg-transparent border-b outline-none w-full p-1"
							placeholder="Username"
							autoComplete="off"
						/>
					</div>

					<div className="relative my-5">
						<input
							type={isTypePassword ? "password" : "text"}
							name="password"
							id="password"
							className="bg-transparent border-b outline-none w-full p-1 pr-5"
							placeholder="Password"
							autoComplete="off"
						/>
						<div
							className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
							onClick={() => setIsTypePassword(!isTypePassword)}
						>
							{isTypePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
						</div>
					</div>

					<button className="button theme-button1 block w-fit mx-auto text-xs" type="submit">
						{isLoading ? <div className="loading-animation mx-auto" /> : <span>Sign up</span>}
					</button>
				</form>
			</div>
		</div>
	) : null;
}

export default Signup;
