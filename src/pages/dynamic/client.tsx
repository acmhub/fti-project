import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { FaRegIdCard } from "react-icons/fa";
import { toast } from "react-toastify";
import Layout from "../../components/app";
import Modal from "../../components/modal";
import useGetClient from "../../data/clients/useGetClient";

function ClientPage() {
	const { clientId } = useParams();
	const { isLoading, clientData } = useGetClient(Number(clientId));
	const [clientProfile, setClientProfile] = useState<Client | any>();
	const [isOpen, setIsOpen] = useState(false);

	async function modifyClient(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		formData.id = clientData.id;
		formData.client_type = formData.first_name ? "individual" : "company";

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/clients/modifyClient.php`,
				{
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
				setClientProfile(response.data.client);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		setClientProfile(clientData);
	}, [clientData]);

	return (
		<Layout>
			{!isLoading ? (
				<div>
					<div className="page-title">
						<h1 className="text-2xl">
							{clientProfile?.first_name
								? clientProfile?.first_name + " " + clientProfile?.last_name
								: clientProfile?.company_name}
						</h1>
						<p className="text-base text-faded">ID: {clientProfile?.id}</p>
					</div>

					<div className="divide-y divide-faded my-10">
						<div className="py-2.5">
							<p className="text-faded">{clientProfile?.first_name ? "Identification" : "Company ID"}:</p>
							<p>{clientProfile?.identification}</p>
						</div>
						<div className="py-2.5">
							<p className="text-faded">Email address:</p>
							<p>{clientProfile?.email_address}</p>
						</div>
						<div className="py-2.5">
							<p className="text-faded">Phone number:</p>
							<p>{clientProfile?.phone_number}</p>
						</div>
						<div className="py-2.5">
							<p className="text-faded">Created at:</p>
							<p>{moment(clientData?.createdAt).format("DD.MM.YYYY HH:mm")}</p>
						</div>
						<div className="py-2.5">
							<p className="text-faded">Updated at:</p>
							<p>
								{clientProfile?.updatedAt
									? moment(clientProfile?.updatedAt).format("DD.MM.YYYY HH:mm")
									: "-"}
							</p>
						</div>
					</div>

					<button
						className="button theme-button2 flex items-center space-x-1"
						onClick={() => setIsOpen(true)}
					>
						<FaRegIdCard />
						<span>Modify</span>
					</button>

					<Modal title="Modify Client" isOpen={isOpen} setIsOpen={setIsOpen}>
						<form onSubmit={modifyClient} className="space-y-5">
							{clientProfile?.first_name ? (
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
									<div className="col-span-1">
										<div className="form-input">
											<input
												type="text"
												name="first_name"
												id="first_name"
												defaultValue={clientProfile.first_name}
											/>
											<label htmlFor="first_name">First Name</label>
										</div>
									</div>
									<div className="col-span-1">
										<div className="form-input">
											<input
												type="text"
												name="last_name"
												id="last_name"
												defaultValue={clientProfile.last_name}
											/>
											<label htmlFor="last_name">Last Name</label>
										</div>
									</div>
								</div>
							) : (
								<div className="form-input">
									<input
										type="text"
										name="company_name"
										id="company_name"
										defaultValue={clientProfile?.company_name}
									/>
									<label htmlFor="company_name">Company Name</label>
								</div>
							)}

							<div className="form-input">
								<input
									type="text"
									name="identification"
									id="identification"
									defaultValue={clientProfile?.identification}
								/>
								<label htmlFor="identification">Identification</label>
							</div>

							<div className="form-input">
								<input
									type="text"
									name="email_address"
									id="email_address"
									defaultValue={clientProfile?.email_address}
								/>
								<label htmlFor="email_address">Email address</label>
							</div>

							<div className="form-input">
								<input
									type="text"
									name="phone_number"
									id="phone_number"
									defaultValue={clientProfile?.phone_number}
								/>
								<label htmlFor="phone_number">Phone number</label>
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

export default ClientPage;
