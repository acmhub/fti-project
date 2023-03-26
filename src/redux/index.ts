import { configureStore } from "@reduxjs/toolkit";
import theme from "./slices/theme";
import projectItems from "./slices/project-items";
import isAdmin from "./slices/isAdmin";
import isSidebarExpanded from "./slices/isSidebarExpanded";

export const store = configureStore({
	reducer: {
		theme,
		projectItems,
		isAdmin,
		isSidebarExpanded,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
