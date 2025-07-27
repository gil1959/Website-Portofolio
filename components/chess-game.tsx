"use client"

import { useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Trophy } from "lucide-react"

type PieceType = "king" | "queen" | "rook" | "bishop" | "knight" | "pawn"
type PieceColor = "white" | "black"

interface Piece {
  type: PieceType
  color: PieceColor
}

type Board = (Piece | null)[][]
type Position = { row: number; col: number }

const initialBoard: Board = [
  [
    { type: "rook", color: "black" },
    { type: "knight", color: "black" },
    { type: "bishop", color: "black" },
    { type: "queen", color: "black" },
    { type: "king", color: "black" },
    { type: "bishop", color: "black" },
    { type: "knight", color: "black" },
    { type: "rook", color: "black" },
  ],
  Array(8)
    .fill(null)
    .map(() => ({ type: "pawn", color: "black" })),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8)
    .fill(null)
    .map(() => ({ type: "pawn", color: "white" })),
  [
    { type: "rook", color: "white" },
    { type: "knight", color: "white" },
    { type: "bishop", color: "white" },
    { type: "queen", color: "white" },
    { type: "king", color: "white" },
    { type: "bishop", color: "white" },
    { type: "knight", color: "white" },
    { type: "rook", color: "white" },
  ],
]

const pieceSymbols: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
}

export function ChessGame() {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>("white")
  const [moveCount, setMoveCount] = useState(0)
  const [capturedPieces, setCapturedPieces] = useState<{ white: Piece[]; black: Piece[] }>({
    white: [],
    black: [],
  })

  const isValidMove = useCallback(
    (from: Position, to: Position, piece: Piece): boolean => {
      // Basic validation - piece exists and not moving to same square
      if (from.row === to.row && from.col === to.col) return false

      // Can't capture own piece
      const targetPiece = board[to.row][to.col]
      if (targetPiece && targetPiece.color === piece.color) return false

      // Basic movement rules (simplified)
      const rowDiff = Math.abs(to.row - from.row)
      const colDiff = Math.abs(to.col - from.col)

      switch (piece.type) {
        case "pawn":
          const direction = piece.color === "white" ? -1 : 1
          const startRow = piece.color === "white" ? 6 : 1

          // Forward move
          if (to.col === from.col && !targetPiece) {
            if (to.row === from.row + direction) return true
            if (from.row === startRow && to.row === from.row + 2 * direction) return true
          }
          // Diagonal capture
          if (Math.abs(to.col - from.col) === 1 && to.row === from.row + direction && targetPiece) {
            return true
          }
          return false

        case "rook":
          return rowDiff === 0 || colDiff === 0

        case "bishop":
          return rowDiff === colDiff

        case "queen":
          return rowDiff === 0 || colDiff === 0 || rowDiff === colDiff

        case "king":
          return rowDiff <= 1 && colDiff <= 1

        case "knight":
          return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)

        default:
          return false
      }
    },
    [board],
  )

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      const clickedSquare = { row, col }
      const piece = board[row][col]

      if (selectedSquare) {
        const selectedPiece = board[selectedSquare.row][selectedSquare.col]

        if (
          selectedPiece &&
          selectedPiece.color === currentPlayer &&
          isValidMove(selectedSquare, clickedSquare, selectedPiece)
        ) {
          // Make the move
          const newBoard = board.map((row) => [...row])
          const capturedPiece = newBoard[row][col]

          // Update captured pieces
          if (capturedPiece) {
            setCapturedPieces((prev) => ({
              ...prev,
              [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece],
            }))
          }

          newBoard[row][col] = selectedPiece
          newBoard[selectedSquare.row][selectedSquare.col] = null

          setBoard(newBoard)
          setCurrentPlayer(currentPlayer === "white" ? "black" : "white")
          setMoveCount((prev) => prev + 1)
          setSelectedSquare(null)
        } else {
          // Select new piece or deselect
          if (piece && piece.color === currentPlayer) {
            setSelectedSquare(clickedSquare)
          } else {
            setSelectedSquare(null)
          }
        }
      } else {
        // Select piece if it belongs to current player
        if (piece && piece.color === currentPlayer) {
          setSelectedSquare(clickedSquare)
        }
      }
    },
    [board, selectedSquare, currentPlayer, isValidMove],
  )

  const resetGame = () => {
    setBoard(initialBoard)
    setSelectedSquare(null)
    setCurrentPlayer("white")
    setMoveCount(0)
    setCapturedPieces({ white: [], black: [] })
  }

  const isSquareSelected = (row: number, col: number) => {
    return selectedSquare?.row === row && selectedSquare?.col === col
  }

  const isSquareDark = (row: number, col: number) => {
    return (row + col) % 2 === 1
  }

  return (
    <Card className="p-6 space-y-4  bg-gradient-to-br rounded-none from-gray-50/50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Trophy className="mr-2 h-5 w-5" />
          Chess Game
        </h3>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Turn: <span className="font-medium capitalize">{currentPlayer}</span>
          </div>
          <div className="text-sm text-muted-foreground">Moves: {moveCount}</div>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Chess Board */}
        <div className="flex-1">
          <div className="grid grid-cols-8 gap-0 border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden aspect-square max-w-md mx-auto">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  className={`
                    aspect-square flex items-center justify-center text-2xl font-bold transition-all duration-200
                    ${isSquareDark(rowIndex, colIndex)
                      ? "bg-amber-600 hover:bg-amber-500"
                      : "bg-amber-100 hover:bg-amber-200 dark:bg-amber-50 dark:hover:bg-amber-100"
                    }
                    ${isSquareSelected(rowIndex, colIndex) ? "ring-4 ring-blue-500 ring-inset" : ""}
                    ${piece && piece.color === currentPlayer ? "hover:scale-110" : ""}
                  `}
                >
                  {piece && (
                    <span className={piece.color === "white" ? "text-gray-400 drop-shadow-lg" : "text-black"}>
                      {pieceSymbols[piece.color][piece.type]}
                    </span>
                  )}
                </button>
              )),
            )}
          </div>
        </div>

        {/* Captured Pieces */}
        <div className="space-y-4 min-w-[200px]">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Captured by White</h4>
            <div className="flex flex-wrap gap-1 p-2 bg-muted rounded min-h-[40px]">
              {capturedPieces.black.map((piece, index) => (
                <span key={index} className="text-lg">
                  {pieceSymbols[piece.color][piece.type]}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Captured by Black</h4>
            <div className="flex flex-wrap gap-1 p-2 bg-muted rounded min-h-[40px]">
              {capturedPieces.white.map((piece, index) => (
                <span key={index} className="text-lg">
                  {pieceSymbols[piece.color][piece.type]}
                </span>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Click a piece to select it</p>
            <p>• Click a valid square to move</p>
            <p>• White moves first</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
