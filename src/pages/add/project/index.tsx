import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../../components/app";
import useGetClients from "../../../data/clients/useGetClients";
import { removeItems } from "../../../redux/slices/project-items";
import Autocomplete from "../../../components/autocomplete";
import AddItem from "./addItem";
import DisplayItems from "./displayItems";
import { listProjectItems } from "../../../redux/slices/project-items";

function AddProject() {
	let navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { clients } = useGetClients();
	const { items } = useSelector(listProjectItems);

	const dispatch = useDispatch();

	const autocompleteOptions =
		clients &&
		clients.map(({ id, first_name, last_name, company_name }) => {
			const label: string = first_name ? first_name + " " + last_name : company_name;
			return { id, label };
		});

	async function addProject(e: React.ChangeEvent<HTMLFormElement>) {
		e.preventDefault();

		let form = new FormData(e.target);
		let formData = Object.fromEntries(form);

		// Rename Autocomplete value key to client
		formData["client_id"] = formData["value"];
		delete formData["value"];
		Object.assign(formData, { items: items });

		try {
			/**
			 * Create the /projects/addProject endpoint
			 * Return the project id
			 *
			 * Create the /projects/addItem endpoint
			 * For each of {items}
			 * 		- create a project_item entry
			 * 		- assign the project_id
			 *
			 * navigate(`/projects/${id}`);
			 */
			setIsLoading(true);

			const response = await axios.post(
				`${process.env.REACT_APP_DB_API}/projects/addProject.php`,
				{ ...formData },
				{
					headers: {
						"Content-Type": "multipart/form-date",
					},
				}
			);
			console.log(response.data);

			if (response.data.status === 200) {
				setIsLoading(false);
				navigate(`/project/${response.data.project}`);
			} else {
				toast.error(response.data.message);
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			console.log(error);
		}

		dispatch(removeItems());
		e.target.reset();
	}

	return (
		<Layout>
			<h1 className="page-title">Add Project</h1>

			<form className="mt-10" name="add-client" onSubmit={addProject} id="add-project">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
					<Autocomplete options={autocompleteOptions} />

					<div className="form-input">
						<input type="text" name="project_name" id="project_name" placeholder="" />
						<label htmlFor="project_name">Project Name</label>
					</div>

					<div className="form-input">
						<input type="text" name="discount" id="discount" placeholder="" />
						<label htmlFor="discount">Discount</label>
					</div>
				</div>
			</form>

			<div className="space-y-10 my-10">
				<DisplayItems />

				<AddItem />
			</div>

			<div className="flex items-center justify-between">
				{items && items.length > 0 && (
					<button className="button theme-button1" onClick={() => dispatch(removeItems())}>
						Clear items
					</button>
				)}

				<button className="button theme-button2 block w-fit ml-auto" type="submit" form="add-project">
					{!isLoading ? <span>Create project</span> : <div className="loading-animation mx-auto" />}
				</button>
			</div>
		</Layout>
	);
}

export default AddProject;
