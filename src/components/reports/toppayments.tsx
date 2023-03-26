import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";

type TopPaymentsData = {
	id: number;
	project_id: number;
	amount: number;
};

function TopPayments() {
	const [isLoading, setIsLoading] = useState(false);
	const [topPayments, setTopPayments] = useState<TopPaymentsData[]>();

	async function getTopPayments() {
		try {
			const response = await axios.get(`${process.env.REACT_APP_DB_API}/reports/getTopPayments.php`);

			if (response.status === 200) {
				setTopPayments(response.data.payments);
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
		getTopPayments();
	}, []);

	return (
		<div className="card space-y-2.5 p-2.5">
			<p className="text-xl">Top Payments</p>

			{!isLoading ? (
				<div className="divide-y divide-black dark:divide-white">
					{topPayments && topPayments.length > 0 ? (
						topPayments.map(({ id, project_id, amount }, i) => (
							<div className="flex items-center justify-between py-2" key={i}>
								<span>${amount}</span>
								<Link className="cursor-pointer pl-4" to={`/project/${project_id}`}>
									<HiOutlineExternalLink className="h-4 w-4" />
								</Link>
							</div>
						))
					) : (
						<li>No payments found.</li>
					)}
				</div>
			) : (
				<div className="loading-animation mx-auto" />
			)}
		</div>
	);
}

export default TopPayments;
