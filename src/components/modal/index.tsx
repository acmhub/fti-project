import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	title: string;
	children: React.ReactNode;
}

function Modal({ isOpen, setIsOpen, title, children }: Props) {
	return (
		<div
			className={`
        fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 card bg-white dark:bg-black p-4 max-h-[75vh] h-fit max-w-xs lg:max-w-xl w-full overflow-y-auto divide-y divide-faded duration-200 z-50 ${
			isOpen ? "opacity-100" : "opacity-0 mt-2 pointer-events-none"
		}
    `}
		>
			<div className="flex items-center justify-between pb-2.5">
				<h4>{title}</h4>
				<AiOutlineClose className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(false)} />
			</div>

			<div className="py-5">{children}</div>
		</div>
	);
}

export default Modal;
