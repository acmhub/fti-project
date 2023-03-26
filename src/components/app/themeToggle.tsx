import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdLightMode, MdNightlight } from "react-icons/md";
import type { RootState } from "../../redux";
import { setTheme } from "../../redux/slices/theme";

function ThemeToggle({ isExpanded }: { isExpanded?: boolean }) {
	const theme = useSelector((state: RootState) => state.theme.mode);
	const dispatch = useDispatch();

	useEffect(() => {
		theme === "dark"
			? document.body.classList.add("dark", "bg-dark")
			: document.body.classList.remove("dark", "bg-dark");
	}, [theme]);

	return theme === "light" ? (
		<div className="flex items-center duration-100 cursor-pointer mb-2" onClick={() => dispatch(setTheme("dark"))}>
			<MdNightlight className="h-4 md:h-5 w-4 md:w-5" />
			<p className={`text-sm ml-1 duration-100 ${!isExpanded && "md:hidden"}`}>Dark mode</p>
		</div>
	) : (
		<div className="flex items-center duration-100 cursor-pointer mb-2" onClick={() => dispatch(setTheme("light"))}>
			<MdLightMode className="h-4 md:h-5 w-4 md:w-5" />
			<p className={`text-sm ml-1 duration-100 ${!isExpanded && "md:hidden"}`}>Light mode</p>
		</div>
	);
}

export default ThemeToggle;
