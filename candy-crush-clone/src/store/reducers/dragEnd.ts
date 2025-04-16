import { Draft } from "@reduxjs/toolkit";
import {
  formulaForColumnOfFour,
  formulaForColumnOfThree,
  generateInvalidMoves,
} from "../../utils/formulas";
import {
  isColumnOfFour,
  isColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
} from "../../utils/moveCheckLogic";

export const dragEndReducer = (
  state: Draft<{
    board: string[];
    boardSize: number;
    squareBeingReplaced: { id: number; src: string; } | undefined;
    squareBeingDragged: { id: number; src: string; } | undefined;
  }>
) => {
  const newBoard = [...state.board];
  let { boardSize, squareBeingDragged, squareBeingReplaced } = state;
  if (!squareBeingDragged || !squareBeingReplaced) return;

  const squareBeingDraggedId = squareBeingDragged.id;
  const squareBeingReplacedId = squareBeingReplaced.id;

  newBoard[squareBeingReplacedId] = squareBeingDragged.src;
  newBoard[squareBeingDraggedId] = squareBeingReplaced.src;

  const validMoves: number[] = [
    squareBeingDraggedId - 1,
    squareBeingDraggedId - boardSize,
    squareBeingDraggedId + 1,
    squareBeingDraggedId + boardSize,
  ];

  const validMove: boolean = validMoves.includes(squareBeingReplacedId);

  const isAColumnOfFour: boolean | undefined = isColumnOfFour(
    newBoard,
    boardSize,
    formulaForColumnOfFour(boardSize)
  );

  const isARowOfFour: boolean | undefined = checkForRowOfFour(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize, true)
  );

  const isAColumnOfThree: boolean | undefined = isColumnOfThree(
    newBoard,
    boardSize,
    formulaForColumnOfThree(boardSize)
  );

  const isARowOfThree: boolean | undefined = checkForRowOfThree(
    newBoard,
    boardSize,
    generateInvalidMoves(boardSize)
  );

  if (
    squareBeingReplacedId &&
    validMove &&
    (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)
  ) {
    squareBeingDragged = undefined;
    squareBeingReplaced = undefined;
  } else {
    newBoard[squareBeingReplacedId] = squareBeingReplaced.src;
    newBoard[squareBeingDraggedId] = squareBeingDragged.src;
  }
  state.board = newBoard;
};