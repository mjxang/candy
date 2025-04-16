import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "../utils/createBoard";
import { moveBelowReducer } from "./reducers/moveBelow";

const initialState: {
    board: string[];
    boardSize: number;
    squareBeingDragged: HTMLElement | undefined;
    squareBeingReplaced: HTMLElement | undefined;
} = {
    board: [],
    boardSize: 8,
    squareBeingDragged: undefined,
    squareBeingReplaced: undefined
};

const candyCrushSlice = createSlice({
    name: "candyCrush",
    initialState,
    reducers: {
        updateBoard: (state, action: PayloadAction<string[]>) => {
            state.board = action.payload;
        },
        moveBelow: moveBelowReducer
    },
});

export const store = configureStore({
    reducer: {
        candyCrush: candyCrushSlice.reducer
    }
});

export const { updateBoard, moveBelow } = candyCrushSlice.actions; 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch