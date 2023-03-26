import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ThemeState {
	mode: string;
}

const initialState: ThemeState = {
	mode: "dark",
};

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<string>) => {
			state.mode = action.payload;
			localStorage.setItem("theme", action.payload);
		},
	},
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
