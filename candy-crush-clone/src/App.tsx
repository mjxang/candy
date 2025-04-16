import React, { useEffect } from 'react'
import { updateBoard } from './store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { createBoard } from './utils/createBoard';
import Board from './components/Board';
import { isColumnOfFour } from './utils/moveCheckLogic';
import { formulaForColumnOfFour } from './utils/formulas';

function App() {
  const dispatch = useAppDispatch();

  const board = useAppSelector(({ candyCrush: { board } }) => board);
  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)));
  }, [boardSize, dispatch]);

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      const newBoard = [...board]
      isColumnOfFour(newBoard,boardSize,formulaForColumnOfFour(boardSize));
      dispatch(updateBoard(newBoard))
    },150);
    return () => clearInterval(timeout)
},[board,boardSize,dispatch]);
 
  return (
    <div className="flex items-center justify-center h-screen">
      <Board/>
    </div>
  )
}

export default App