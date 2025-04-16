import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "../utils/createBoard";
import { moveBelowReducer } from "./reducers/moveBelow";
import { dragEndReducer } from "./reducers/dragEnd";
interface DraggedSquare {
    id: number;
    src: string;
}

const initialState: {
    board: string[];
    boardSize: number;
    squareBeingDragged: DraggedSquare | undefined;
    squareBeingReplaced: DraggedSquare | undefined;
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
        dragStart: (state, action: PayloadAction<DraggedSquare>) => {
            state.squareBeingDragged = action.payload;
        },
        dragDrop: (state, action: PayloadAction<DraggedSquare>) => {
            state.squareBeingReplaced = action.payload;
        },
        updateBoard: (state, action: PayloadAction<string[]>) => {
            state.board = action.payload;
        },
        dragEnd: dragEndReducer,
        moveBelow: moveBelowReducer
    },
});

export const store = configureStore({
    reducer: {
        candyCrush: candyCrushSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export const { updateBoard, moveBelow, dragStart, dragEnd, dragDrop } = candyCrushSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch