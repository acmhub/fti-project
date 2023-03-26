import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "../../../components/modal";
import useGetProjectPayments from "../../../data/payments/useGetProjectPayments";
import Payment from "./payment";

type Props = {
	project_id: number;
	total: number;
};

function Payments({ project_id, total }: Props) {
	const { isLoading, paymentsData } = useGetProjectPayments(project_id);
	const [payments, setPayments] = useState<Payment[]>();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setPayments(paymentsData);
	}, [!isLoading]);

	let amountDue = total;
	if (!isLoading && payments) {
		amountDue =
			total -
			payments.reduce((acc, payment) => {
				return acc + Number(payment.amount);
			}, 0);
	}

	async function addPayment(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		formData.project_id = project_id.toString();

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/payments/addPayment.php`,
				{
					...formData,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.data.status === 200) {
				window.location.reload();
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h5>Payments</h5>

			{!isLoading ? (
				payments && payments.length > 0 ? (
					<div>
						<div className="divide-y">
							{payments.map((payment) => (
								<Payment payment={payment} key={payment.id} />
							))}
						</div>

						<div className="text-right mt-5">
							<p>Amount due: ${amountDue.toFixed(2)}</p>
						</div>
					</div>
				) : (
					<div>
						<p>0 payments found.</p>
					</div>
				)
			) : (
				<div className="loading-animation mx-auto" />
			)}

			<button className="theme-button2 block w-fit mx-auto mt-5" onClick={() => setIsOpen(true)}>
				Add payment
			</button>

			<Modal title="Add payment" isOpen={isOpen} setIsOpen={setIsOpen}>
				<form className="space-y-5" onSubmit={addPayment}>
					<div>
						<div>Amount</div>
						<div className="form-input">
							<input type="number" name="amount" step={0.01} id="amount" />
						</div>
					</div>

					<div>
						<div>Select date</div>
						<input
							type="date"
							name="paidAt"
							defaultValue={new Date().toISOString().split("T")[0]}
							max={new Date().toISOString().split("T")[0]}
							className="bg-transparent block outline-none"
						/>
					</div>

					<button className="theme-button2 block w-fit mx-auto" type="submit">
						Submit
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default Payments;
