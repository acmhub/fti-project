import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { HiOutlineExternalLink } from "react-icons/hi";
import Layout from "../components/app";
import useGetClients from "../data/clients/useGetClients";

function Clients() {
	let { isLoading, clients } = useGetClients();

	return (
		<Layout>
			{!isLoading ? (
				<>
					<h1 className="page-title">Clients</h1>
					{clients && clients.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y-2 divide-faded text-sm">
								<thead>
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Identification</th>
										<th>Email address</th>
										<th>Phone number</th>
										<th>Created At</th>
										<th></th>
									</tr>
								</thead>
								<tbody className="divide-y divide-faded">
									{clients.map(
										(
											{
												id,
												first_name,
												last_name,
												company_name,
												identification,
												email_address,
												phone_number,
												createdAt,
											},
											i
										) => (
											<tr className="hover:backdrop-blur-md duration-100" key={id}>
												<td>{i + 1}</td>
												<td>{first_name ? first_name + " " + last_name : company_name}</td>
												<td>{identification}</td>
												<td>{email_address ? email_address : "-"}</td>
												<td>{phone_number ? phone_number : "-"}</td>
												<td>{moment(createdAt).format("DD.MM.YYYY HH:mm")}</td>
												<td>
													<Link to={`/client/${id}`}>
														<HiOutlineExternalLink className="h-4 w-4 cursor-pointer" />
													</Link>
												</td>
											</tr>
										)
									)}
									<tr>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					) : (
						<p>0 clients found.</p>
					)}
				</>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</Layout>
	);
}

export default Clients;
