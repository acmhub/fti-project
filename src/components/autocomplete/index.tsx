import React, { useState, useEffect } from "react";

type Option = {
	id: string;
	label: string;
};

type Props = {
	options: Option[];
};

function Autocomplete({ options }: Props) {
	const [autoCompleteState, setAutoCompleteState] = useState({
		searchQuery: "",
		isOpen: false,
		filteredOptions: options,
		value: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAutoCompleteState({
			...autoCompleteState,
			searchQuery: e.target.value,
			isOpen: false,
			filteredOptions: options.filter((option) =>
				option.label.toLowerCase().includes(e.target.value.toLowerCase())
			),
		});
	}

	function handleOptionClick(option: Option) {
		setAutoCompleteState({
			value: option.id,
			searchQuery: option.label,
			filteredOptions: options,
			isOpen: false,
		});
	}

	useEffect(() => {
		setAutoCompleteState({
			...autoCompleteState,
			isOpen: autoCompleteState.filteredOptions !== options ? true : false,
		});
	}, [autoCompleteState.searchQuery]);

	return (
		<React.Fragment>
			<input type="text" name="value" value={autoCompleteState.value} className="hidden" readOnly />

			<div className="relative">
				<div className="relative form-input">
					<input type="text" value={autoCompleteState.searchQuery} onChange={handleChange} />
					<label htmlFor="">Client</label>
				</div>

				{autoCompleteState.filteredOptions && (
					<ul
						className={`absolute top-full left-0 w-full max-h-60 overflow-y-auto duration-150 card rounded-t-none scrollbar-hide divide-y p-0 z-50 ${
							!autoCompleteState.isOpen ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100"
						}`}
					>
						{autoCompleteState.filteredOptions.length > 0 ? (
							autoCompleteState.filteredOptions.map((option) => (
								<li
									className="cursor-pointer p-2"
									onClick={() => handleOptionClick(option)}
									key={option.id}
								>
									{option.label}
								</li>
							))
						) : (
							<li className="cursor-pointer p-2">No match found.</li>
						)}
					</ul>
				)}
			</div>
		</React.Fragment>
	);
}

export default Autocomplete;
