import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.svg";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

function Login() {
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
			const response = await axios.post(`${process.env.REACT_APP_DB_API}/auth/login.php`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.data.status === "success") {
				// Login successful
				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 7);

				setIsLoading(false);
				setCookie(
					"user",
					{
						isLoggedIn: true,
						userId: response.data.user.id,
						username: formData.username,
					},
					{
						expires: expireDate,
						path: "/",
					}
				);
				navigate("/");
			} else {
				console.log(response.data.message);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log("An error occurred");
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

				<h4 className="text-center mb-5">Login</h4>

				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="username" className="text-xs text-gray-500">
							Username: admin
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="bg-transparent border-b outline-none w-full p-1"
							placeholder="Username"
							autoComplete="off"
						/>
					</div>

					<div className="my-5">
						<label htmlFor="username" className="text-xs text-gray-500">
							Password: admin
						</label>
						<div className="relative">
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
					</div>

					<button className="button theme-button1 block w-fit mx-auto text-xs" type="submit">
						{isLoading ? <div className="loading-animation mx-auto" /> : <span>Log in</span>}
					</button>
				</form>

				<Link to="/sign-up" className="block text-center text-xs text-gray-400 mt-5">
					Don't have an account? Sign up.
				</Link>
			</div>
		</div>
	) : null;
}

export default Login;
