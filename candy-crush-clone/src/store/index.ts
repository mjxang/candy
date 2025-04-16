import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "../utils/createBoard";
import { moveBelowReducer } from "./reducers/moveBelow";

const initialState: {
    board: string[];
    boardSize: number;
    squareBeingDragged: number | undefined;
    squareBeingReplaced: number | undefined;
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
        dragStart: (state, action: PayloadAction<number>) => {
            state.squareBeingDragged = action.payload;
        },
        dragEnd: (state, action: PayloadAction<void>) => {
            state.squareBeingDragged = undefined;
        },
        dragOver: (state, action: PayloadAction<number>) => {
            state.squareBeingReplaced = action.payload;
        },
        dragEnter: (state, action: PayloadAction<number>) => {
            state.squareBeingReplaced = action.payload;
        },
        dragLeave: (state, action: PayloadAction<void>) => {
            state.squareBeingReplaced = undefined;
        },
        dragDrop: (state, action: PayloadAction<number>) => {
            state.squareBeingReplaced = undefined;
        },
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

export const { updateBoard, moveBelow, dragStart, dragEnd, dragOver, dragEnter, dragLeave, dragDrop } = candyCrushSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch