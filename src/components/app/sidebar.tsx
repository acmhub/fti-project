import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { AiOutlineFolderAdd, AiOutlineUserAdd } from "react-icons/ai";
import { MdOutlineManageAccounts } from "react-icons/md";
import type { RootState } from "../../redux";
import { navLinks } from "../../data/navLinks";
import ThemeToggle from "./themeToggle";
import { setIsSidebarExpanded } from "../../redux/slices/isSidebarExpanded";

function Sidebar() {
	const dispatch = useDispatch();
	const location = useLocation();
	const isAdmin = useSelector((state: RootState) => state.isAdmin.isAdmin);
	const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpanded.isSidebarExpanded);

	return (
		<div className="flex flex-row md:flex-col items-center md:items-start justify-evenly md:justify-between md:pr-4 py-1 md:py-4 h-full transition-all duration-200">
			<div className="flex flex-row md:flex-col items-center md:items-start justify-evenly md:justify-between w-full md:w-max md:space-y-2">
				{navLinks.map(({ id, label, path, Icon }) => (
					<Link
						className={location.pathname === path ? "sidebar-link active" : "sidebar-link"}
						to={path}
						key={id}
					>
						<Icon className="h-5 w-5" />
						<p className={`text-sm ${!isSidebarExpanded && "md:hidden"}`}>{label}</p>
					</Link>
				))}

				{isAdmin ? (
					<Link
						className={
							location.pathname === "/users"
								? "sidebar-link active hidden md:flex"
								: "sidebar-link hidden md:flex"
						}
						to="/users"
					>
						<MdOutlineManageAccounts className="h-4 md:h-5 w-4 md:w-5" />
						<p className={`text-sm ${!isSidebarExpanded && "md:hidden"}`}>Manage Users</p>
					</Link>
				) : null}
			</div>

			<div className="hidden md:flex flex-col items-center w-full">
				<div className="space-y-2">
					<Link
						to="/add-project"
						className={location.pathname === "/add-project" ? "sidebar-link active" : "sidebar-link"}
					>
						<AiOutlineFolderAdd className="h-4 md:h-5 w-4 md:w-5" />
						<p className={`text-sm whitespace-nowrap ${!isSidebarExpanded && "md:hidden"}`}>Add Project</p>
					</Link>
					<Link
						to="/add-client"
						className={location.pathname === "/add-client" ? "sidebar-link active" : "sidebar-link"}
					>
						<AiOutlineUserAdd className="h-4 md:h-5 w-4 md:w-5" />
						<p className={`text-sm whitespace-nowrap ${!isSidebarExpanded && "md:hidden"}`}>Add Client</p>
					</Link>
				</div>

				<div className="divider my-5" />

				<ThemeToggle isExpanded={isSidebarExpanded} />

				<HiOutlineChevronLeft
					className={`h-5 w-5 mt-2.5 duration-100 cursor-pointer ${
						!isSidebarExpanded ? "rotate-180" : "ml-auto"
					}`}
					onClick={() => dispatch(setIsSidebarExpanded(!isSidebarExpanded))}
				/>
			</div>
		</div>
	);
}

export default Sidebar;
