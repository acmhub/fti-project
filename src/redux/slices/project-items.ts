import { createSlice, Draft } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface ProjectItemsState {
	items: ProjectItem[];
}

const initialState: ProjectItemsState = {
	items: [],
};

export const projectItemsSlice = createSlice({
	name: "projectItems",
	initialState,
	reducers: {
		addItem: (state: Draft<typeof initialState>, action: PayloadAction<typeof initialState>) => {
			state.items = [...state.items, action.payload as ProjectItem];
		},

		modifyItem: (state: Draft<typeof initialState>, action: PayloadAction<ProjectItem>) => {
			const modifiedItemList = state.items.map((item) => {
				if (Number(item.key) === Number(action.payload.key as number)) {
					return action.payload;
				}
				return item;
			});
			// state.items = [{...state.items, modifiedItemList}];
			state.items = modifiedItemList;
		},

		removeItem: (state: Draft<typeof initialState>, action: PayloadAction<number>) => {
			const items = state.items.filter((product) => Number(product.key) !== Number(action.payload));
			state.items = items;
		},

		removeItems: (state: Draft<typeof initialState>) => {
			state.items = [];
		},
	},
});

export const listProjectItems = (state: RootState) => state.projectItems;
export const { addItem, modifyItem, removeItem, removeItems } = projectItemsSlice.actions;
export default projectItemsSlice.reducer;
