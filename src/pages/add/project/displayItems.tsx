import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineModeEdit, MdOutlineDelete } from "react-icons/md";
import { listProjectItems, modifyItem, removeItem } from "../../../redux/slices/project-items";
import Modal from "../../../components/modal";

function DisplayItems() {
	const [isOpen, setIsOpen] = useState(false);
	const [modifiedItem, setModifiedItem] = useState({
		key: 0,
		service: "",
		value: 0,
	});
	const dispatch = useDispatch();
	const { items } = useSelector(listProjectItems);

	const toggleModify = (key: number, service: string, value: number) => {
		setIsOpen(true);
		setModifiedItem({ key, service, value });
	};

	const handleModifyItem = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);
		console.log(formData);

		dispatch(modifyItem(formData));
		setIsOpen(false);
	};

	return (
		<div className="space-y-5">
			{/* 
				Do a checkbox for pre-mades such as:
				- Custom template
				- Mobile Reponsive
				- SEO
			*/}

			{items && items.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y-2 divide-faded text-sm">
						<thead>
							<tr>
								<th>#</th>
								<th>Service</th>
								<th>Value</th>
								<th></th>
							</tr>
						</thead>

						<tbody className="divide-y divide-faded">
							{items.map(({ key, service, value }, i) => (
								<tr className="hover:backdrop-blur-md duration-100" key={key}>
									<td>{i + 1}</td>
									<td>{service}</td>
									<td>{value}</td>
									<td className="flex items-center justify-end space-x-2.5 w-fit">
										<button
											className="hover-circle hover:bg-teal-800 dark:hover:bg-teal-800"
											onClick={() =>
												toggleModify(key as number, service as string, value as number)
											}
										>
											<MdOutlineModeEdit className="h-5 w-5" />
										</button>

										<button
											className="hover-circle hover:bg-red-800 dark:hover:bg-red-800"
											onClick={() => dispatch(removeItem(key as number))}
										>
											<MdOutlineDelete className="h-5 w-5" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<Modal title="Modify Item" isOpen={isOpen} setIsOpen={setIsOpen}>
						<form className="flex flex-col items-center gap-10" onSubmit={handleModifyItem}>
							<input
								type="text"
								name="key"
								id="key"
								value={modifiedItem?.key}
								className="hidden"
								readOnly
							/>

							<div className="form-input w-full">
								<input
									type="text"
									name="service"
									id="service"
									defaultValue={modifiedItem?.service}
									placeholder=""
								/>
								<label htmlFor="service">Service provided</label>
							</div>

							<div className="form-input w-full">
								<input
									type="text"
									name="value"
									id="value"
									defaultValue={modifiedItem?.value}
									placeholder=""
								/>
								<label htmlFor="value">Value (€)</label>
							</div>

							<button className="theme-button2" type="submit">
								Modify
							</button>
						</form>
					</Modal>
				</div>
			) : (
				<div>No items in the list.</div>
			)}
		</div>
	);
}

export default DisplayItems;
