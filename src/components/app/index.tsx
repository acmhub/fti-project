import React from "react";
import Navigation from "./navigation";
import Sidebar from "./sidebar";

interface Props {
	children: React.ReactNode;
}

function Layout({ children }: Props) {
	return (
		<div className="h-screen bg-light text-black dark:bg-dark dark:text-white duration-150">
			<Navigation />

			<div className="container flex">
				<div className="fixed md:relative bottom-0 md:bottom-auto left-0 md:left-auto w-full md:w-max bg-white dark:bg-black md:bg-transparent dark:md:bg-transparent border-t md:border-r md:border-t-0 border-faded duration-150 z-40">
					<Sidebar />
				</div>

				<main className="relative h-[calc(100vh_-_3.6rem)] w-full overflow-y-auto scrollbar-hide pb-20 p-4 px-0 md:px-4">
					{children}
				</main>
			</div>
		</div>
	);
}

export default Layout;
