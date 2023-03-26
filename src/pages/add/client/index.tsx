import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../components/app";

function AddClient() {
	let navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const [clientType, setClientType] = useState("individual");

	async function addClient(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		formData.client_type = clientType;

		try {
			setIsLoading(true);
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/clients/addClient.php`,
				{ ...formData },
				{
					headers: {
						"Content-Type": "multipart/form-date",
					},
				}
			);

			if (response.data.status === 200) {
				setIsLoading(false);
				navigate(`/client/${response.data.client.id}`);
			} else {
				console.log(response);
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}

	return (
		<Layout>
			<h1 className="page-title">Add Client</h1>

			<div className="flex items-center gap-5">
				<p className={`duration-100 ${clientType !== "individual" && "opacity-50"}`}>Individual</p>
				<div className="flex items-center w-fit">
					<div className="relative h-4 w-8 bg-faded rounded-full transition duration-200 ease-linear z-10">
						<label
							htmlFor="clientType"
							className={`absolute left-0 bg-white border-2 mb-2 w-4 h-4 rounded-full transition transform duration-100 ease-linear cursor-pointer
							${clientType === "individual" ? "translate-x-0 border-theme1" : "translate-x-full border-theme2"}
							`}
						></label>
						<input
							type="checkbox"
							id="clientType"
							className="appearance-none w-full h-full active:outline-none focus:outline-none cursor-pointer"
							onClick={() => setClientType(clientType === "individual" ? "company" : "individual")}
						/>
					</div>
				</div>
				<p className={`duration-100 ${clientType !== "company" && "opacity-50"}`}>Company</p>
			</div>

			<form className="space-y-5 mt-10" name="add-client" onSubmit={addClient}>
				{clientType === "individual" && (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div className="form-input">
							<input type="text" name="first_name" id="first_name" placeholder="" />
							<label htmlFor="first_name">First Name</label>
						</div>
						<div className="form-input">
							<input type="text" name="last_name" id="last_name" placeholder="" />
							<label htmlFor="last_name">Last Name</label>
						</div>
					</div>
				)}

				{clientType === "company" && (
					<div className="form-input">
						<input type="text" name="company_name" id="company_name" placeholder="" />
						<label htmlFor="company_name">Company Name</label>
					</div>
				)}

				<div className="form-input">
					<input type="text" name="identification" id="identification" placeholder="" />
					<label htmlFor="identification">{clientType === "individual" ? "CNP" : "CUI"}</label>
				</div>

				<div className="form-input">
					<input type="text" name="email_address" id="email_address" placeholder="" />
					<label htmlFor="email_address">Email address</label>
				</div>

				<div className="form-input">
					<input type="text" name="phone_number" id="phone_number" placeholder="" />
					<label htmlFor="phone_number">Phone number</label>
				</div>

				<button className="theme-button1 block w-full" type="submit">
					{!isLoading ? <span>Add client</span> : <div className="loading-animation mx-auto" />}
				</button>
			</form>
		</Layout>
	);
}

export default AddClient;
