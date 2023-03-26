import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import Modal from "../../../components/modal";
import useDeletePayment from "../../../data/payments/useDeletePayment";

function Payment({ payment: { id, amount, paidAt } }: { payment: Payment }) {
	const [isOpen, setIsOpen] = useState(false);

	async function modifyPayment(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		formData.id = id.toString();

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/payments/modifyPayment.php`,
				{
					...formData,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				setIsOpen(false);
				toast.success("Payment modified.");
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	}

	const deletePayment = useDeletePayment(id);
	const handleDeletePayment = () => deletePayment();

	return (
		<div className="flex items-center divide-x  py-2">
			<div className="flex flex-1 justify-between pr-4">
				<p>${amount}</p>
				<p>{moment(paidAt).format("DD.MM.YYYY")}</p>
			</div>

			<div className="flex items-center space-x-2 pl-4">
				<div className="hover-circle hover:bg-positive" onClick={() => setIsOpen(true)}>
					<MdOutlineEdit className="h-5 w-5" />
				</div>

				<div className="hover-circle hover:bg-negative" onClick={handleDeletePayment}>
					<MdOutlineDelete className="h-5 w-5" />
				</div>
			</div>

			<Modal title="Modify Payment" isOpen={isOpen} setIsOpen={setIsOpen}>
				<form onSubmit={modifyPayment} className="space-y-5">
					<div className="form-input">
						<input type="number" name="amount" id="amount" defaultValue={amount} step={0.01} />
						<label htmlFor="amount">Amount</label>
					</div>

					<div>
						<div>Select date</div>
						<input
							type="date"
							name="paidAt"
							defaultValue={paidAt}
							max={new Date().toISOString().split("T")[0]}
							className="bg-transparent block outline-none"
						/>
					</div>

					<button className="theme-button2 block w-fit mx-auto" type="submit">
						Modify
					</button>
				</form>
			</Modal>
		</div>
	);
}

export default Payment;
