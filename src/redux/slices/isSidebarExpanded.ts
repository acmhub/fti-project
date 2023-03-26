import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
	isSidebarExpanded: boolean;
}

const initialState: SidebarState = {
	isSidebarExpanded: false,
};

export const sidebarSlice = createSlice({
	name: "isSidebarExpanded",
	initialState,
	reducers: {
		setIsSidebarExpanded: (state, action: PayloadAction<boolean>) => {
			state.isSidebarExpanded = action.payload;
		},
	},
});

export const { setIsSidebarExpanded } = sidebarSlice.actions;
export default sidebarSlice.reducer;
