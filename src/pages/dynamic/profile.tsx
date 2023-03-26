import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useCookies } from "react-cookie";
import { HiOutlineHashtag } from "react-icons/hi";
import { MdOutlineDateRange, MdOutlineExitToApp } from "react-icons/md";
import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegIdCard } from "react-icons/fa";
import { toast } from "react-toastify";
import Layout from "../../components/app";
import Modal from "../../components/modal";

function ProfilePage() {
	const { userId } = useParams();
	const [userProfile, setUserProfile] = useState<User | any>();
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [isTypePassword, setIsTypePassword] = useState(true);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	async function getProfile() {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/users/getProfile.php`,
				{
					userId,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsLoading(false);
				setUserProfile(response.data[0]);
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

	async function modifyProfile(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/users/modifyProfile.php`,
				{
					id: userId,
					...formData,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status === "success") {
				toast.success(response.data.message);
				setIsOpen(false);

				setUserProfile({
					...userProfile,
					username: formData.username,
				});
				setCookie(
					"user",
					{
						...cookies.user,
						username: formData.username.toString(),
					},
					{
						path: "/",
					}
				);
			} else {
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	return (
		<Layout>
			{!isLoading ? (
				<div>
					<span className="block text-faded text-xs uppercase mt-5 md:mt-0">Profile</span>
					<h1 className="page-title capitalize">{userProfile?.username}</h1>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 my-10">
						<div className="card shadow-md flex items-center justify-between px-4 py-2">
							<div className="space-y-1">
								<HiOutlineHashtag className="h-6 w-6" />
								<p className="text-faded text-xs uppercase">id</p>
							</div>

							<h4>{userProfile?.id}</h4>
						</div>

						<div className="card shadow-md flex items-center justify-between px-4 py-2">
							<div className="space-y-1">
								<MdOutlineDateRange className="h-6 w-6" />
								<p className="text-faded text-xs uppercase">Date joined</p>
							</div>

							<h5 className="text-right mt-2.5 md:mt-0">
								{moment(userProfile?.createdAt).format("DD.MM.YYYY")}
							</h5>
						</div>

						<div className="card shadow-md flex items-center justify-between px-4 py-2">
							<div className="space-y-1">
								<AiOutlineUser className="h-6 w-6" />
								<p className="text-faded text-xs uppercase">role</p>
							</div>

							<h5 className="text-right uppercase">{userProfile?.role}</h5>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<button
							className="button theme-button2 flex items-center space-x-1"
							onClick={() => setIsOpen(true)}
						>
							<FaRegIdCard />
							<span>Modify</span>
						</button>

						<button
							className="button theme-button1 flex items-center space-x-1"
							onClick={() => removeCookie("user")}
						>
							<MdOutlineExitToApp />
							<span>Log out</span>
						</button>
					</div>

					<Modal title="Modify Profile" isOpen={isOpen} setIsOpen={setIsOpen}>
						<form onSubmit={modifyProfile}>
							<div className="form-input mb-5">
								<input type="text" name="username" id="username" defaultValue={userProfile?.username} />
								<label htmlFor="username">Username</label>
							</div>

							<div className="relative form-input">
								<input type={isTypePassword ? "password" : "text"} name="password" id="password" />
								<label htmlFor="password">Password</label>

								<div
									className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
									onClick={() => setIsTypePassword(!isTypePassword)}
								>
									{isTypePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
								</div>
							</div>

							<button className="theme-button1 block w-fit mx-auto mt-10" type="submit">
								Modify
							</button>
						</form>
					</Modal>
				</div>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</Layout>
	);
}

export default ProfilePage;
