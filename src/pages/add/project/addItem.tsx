import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { addItem, ProjectItemsState } from "../../../redux/slices/project-items";
import { listProjectItems } from "../../../redux/slices/project-items";

function AddItem() {
	const { items } = useSelector(listProjectItems);
	const dispatch = useDispatch();

	function handleAddItem(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData: any = Object.fromEntries(form);

		/**
		 * Create an item identifier for the modify/update functionality
		 */
		formData = {
			...formData,
			key: items.length === 0 ? 0 : Math.max(...items.map((item) => item.key as number)) + 1,
		};

		dispatch(addItem(formData));
		e.target.reset();
	}

	return (
		<form
			className="flex flex-col md:flex-row items-center small-card border-l-0 rounded-md gap-5 md:gap-2.5 p-4"
			onSubmit={handleAddItem}
		>
			<div className="form-input w-full md:w-[80%]">
				<input type="text" name="service" id="service" placeholder="" />
				<label htmlFor="service">Service provided</label>
			</div>

			<div className="form-input w-full md:w-[15%]">
				<input type="text" name="value" id="value" placeholder="" />
				<label htmlFor="value">Value (€)</label>
			</div>

			<button type="submit" className="hover-circle">
				<AiOutlinePlus className="h-5 w-5 md:h-4 md:w-4" />
			</button>
		</form>
	);
}

export default AddItem;
