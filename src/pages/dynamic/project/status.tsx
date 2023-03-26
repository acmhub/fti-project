import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineChevronDown } from "react-icons/hi";
import getStatusColor from "../../../hooks/getStatusColor";
import { toast } from "react-toastify";

type Props = {
	id: number;
	status: string;
	endpoint: string;
};

const statusOptions = ["cancelled", "in progress", "completed"];

function Status({ id, status, endpoint }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedStatus, setSelectedStatus] = useState<string>(status);

	const handleNewStatus = async () => {
		setIsOpen(false);

		if (selectedStatus === status) return;
		if (selectedStatus === "") return toast.error("New status can't be empty.");

		try {
			const response = await axios.post(
				`${process.env.REACT_APP_DB_API + endpoint}`,
				{
					id,
					status: selectedStatus,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.status === 200) {
				toast.success("Status updated.");
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		handleNewStatus();
	}, [selectedStatus]);

	return (
		<div className="relative w-fit mb-5">
			<div className="flex items-center space-x-1">
				<div className="pill flex items-center space-x-2 bg-faded text-white w-fit px-4 py-1.5">
					<div
						className="w-2 h-2 rounded-full"
						style={{
							backgroundColor: getStatusColor(selectedStatus ? selectedStatus : status),
						}}
					/>
					<p className="capitalize">{selectedStatus ? selectedStatus : status}</p>
				</div>

				<HiOutlineChevronDown
					className={`h-5 w-5 cursor-pointer duration-150 ${isOpen && "rotate-180"}`}
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>

			<div
				className={`absolute top-full left-0 card w-full rounded-t-none p-0 duration-150 overflow-hidden z-50 ${
					isOpen ? "" : "translate-y-2.5 opacity-0 pointer-events-none"
				}`}
			>
				{statusOptions.map((e) => (
					<div
						className="text-sm capitalize px-4 py-2 hover:bg-faded cursor-pointer"
						onClick={() => setSelectedStatus(e)}
						key={e}
					>
						{e}
					</div>
				))}
			</div>
		</div>
	);
}

export default Status;
