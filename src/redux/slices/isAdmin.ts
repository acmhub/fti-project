import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
	isAdmin: boolean;
}

const initialState: AdminState = {
	isAdmin: false,
};

export const adminSlice = createSlice({
	name: "isAdmin",
	initialState,
	reducers: {
		setIsAdmin: (state, action: PayloadAction<boolean>) => {
			state.isAdmin = action.payload;
		},
	},
});

export const { setIsAdmin } = adminSlice.actions;
export default adminSlice.reducer;
