import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { AiOutlineFolderAdd, AiOutlineUserAdd, AiOutlineUser } from "react-icons/ai";
import { MdOutlineManageAccounts, MdOutlineExitToApp } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi";
import type { RootState } from "../../redux";
import ThemeToggle from "./themeToggle";
import Logo from "../../assets/logo.svg";

function Navigation() {
	const isAdmin = useSelector((state: RootState) => state.isAdmin.isAdmin);
	const [isToggled, setIsToggled] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["user"]);

	return (
		<div className="relative bg-white dark:bg-black md:bg-transparent dark:md:bg-transparent border-b border-faded z-50">
			<div className="relative container flex items-center justify-between py-2.5">
				<Link to="/">
					<img
						src={Logo}
						alt="Logo image"
						className="h-auto w-16 object-contain duration-100"
						loading="eager"
					/>
				</Link>

				<div className="flex items-center space-x-1 cursor-pointer" onClick={() => setIsToggled(!isToggled)}>
					<AiOutlineUser className="h-6 w-6 p-1 bg-theme1 text-white rounded-full" />
					<p className="text-xs md:text-sm capitalize">{cookies.user && cookies.user.username}</p>
				</div>

				<div
					className={`absolute top-[102%] right-0 card bg-white dark:bg-black space-y-4 rounded-t-none rounded-br-none duration-150 p-4
					${isToggled ? "translate-y-0 opacity-100" : "translate-y-2.5 opacity-0 pointer-events-none"}
					`}
				>
					{isAdmin && (
						<Link to="/users" className="flex items-center space-x-1 text-sm">
							<MdOutlineManageAccounts className="h-4 md:h-5 w-4 md:w-5" />
							<p>Manage Users</p>
						</Link>
					)}

					<Link to="/add-project" className="flex items-center space-x-1 text-sm">
						<AiOutlineFolderAdd className="h-4 md:h-5 w-4 md:w-5" />
						<p>Add Project</p>
					</Link>

					<Link to="/add-client" className="flex items-center space-x-1 text-sm">
						<AiOutlineUserAdd className="h-4 md:h-5 w-4 md:w-5" />
						<p>Add Client</p>
					</Link>

					<Link to={`/profile/${cookies?.user?.userId}`} className="flex items-center space-x-1 text-sm">
						<HiOutlineIdentification className="h-4 md:h-5 w-4 md:w-5" />
						<p>View profile</p>
					</Link>

					<div
						className="flex items-center space-x-1 text-sm cursor-pointer"
						onClick={() => removeCookie("user")}
					>
						<MdOutlineExitToApp className="h-4 md:h-5 w-4 md:w-5" />
						<p>Log out</p>
					</div>

					<div className="md:hidden">
						<div className="divider my-2.5" />

						<ThemeToggle />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navigation;
