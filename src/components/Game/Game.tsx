import {
  ComputerPlay,
  DefaultGameBoard,
  GameBoard,
  IsGameOver,
  Player,
  Result,
} from '../../utils/tictactoe';
import Board from './Board';
import { FC, useEffect, useRef, useState } from 'react';

export type Position = {
  x: number;
  y: number;
};

const userPiece = 'X';
const computerPiece = 'O';
const Game: FC = () => {
  const [board, setBoard] = useState<GameBoard>(DefaultGameBoard());
  const turnRef = useRef<Player>(userPiece);
  const flipTurn = () => {
    turnRef.current = turnRef.current === userPiece ? computerPiece : userPiece;
  };
  const [result, setResult] = useState<Result>({
    finished: false,
    winner: null,
    finishPosition: undefined,
  });

  const handleUserClick = (block: number) => {
    const newBoard = { ...board };
    newBoard.squares[block] = userPiece;
    setBoard(newBoard);
    flipTurn();
  };

  const computersTurn = () => {
    const play = ComputerPlay(board, computerPiece);
    const newBoard = { ...board };
    newBoard.squares[play] = computerPiece;
    setTimeout(() => {
      setBoard(newBoard);
    }, 1000);
    flipTurn();
  };

  useEffect(() => {
    if (turnRef.current === computerPiece && !IsGameOver(board).finished) {
      computersTurn();
    } else if (IsGameOver(board).finished) {
      setTimeout(() => {
        setResult(IsGameOver(board));
      }, 1000);
    }
  }, [board]);

  return (
    <div className="">
      <div className="">
        <Board
          board={board}
          handleUserClick={handleUserClick}
          result={result}
        />
      </div>
    </div>
  );
};
export default Game;
