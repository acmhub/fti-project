import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { HiOutlineDocumentReport } from "react-icons/hi";

export const navLinks = [
	{
		id: 1,
		label: "Dashboard",
		path: "/",
		Icon: AiOutlineHome,
	},
	{
		id: 2,
		label: "Projects",
		path: "/projects",
		Icon: HiOutlineClipboardDocumentList,
	},
	{
		id: 3,
		label: "Clients",
		path: "/clients",
		Icon: FiUsers,
	},
	{
		id: 4,
		label: "Tasks",
		path: "/tasks",
		Icon: TfiLayoutListThumb,
	},
	{
		id: 5,
		label: "Reports",
		path: "/reports",
		Icon: HiOutlineDocumentReport,
	},
];
