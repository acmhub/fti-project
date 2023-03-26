import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import useGetLatestClients from "../../data/clients/useGetLatestClients";

function LatestClients() {
	let { isLoading, clients } = useGetLatestClients();

	return (
		<div className="small-card h-fit">
			<h6>Latest Clients</h6>
			<div className="divider mt-1" />

			<div className="divide-y">
				{!isLoading ? (
					clients.length > 0 ? (
						clients.map(({ id, first_name, last_name, company_name }) => (
							<div className="flex items-center justify-between py-2 my-1" key={id}>
								<p>
									<span className="text-faded">Client: </span>
									<span>{first_name ? first_name + " " + last_name : company_name}</span>
								</p>

								<Link to={`/client/${id}`}>
									<HiOutlineExternalLink className="h-4 w-4 cursor-pointer" />
								</Link>
							</div>
						))
					) : (
						<div>
							<p>0 recent clients.</p>
						</div>
					)
				) : (
					<div className="loading-animation mx-auto" />
				)}
			</div>
		</div>
	);
}

export default LatestClients;
