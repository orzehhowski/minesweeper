import { useEffect, useState } from "react"
import GameLine from "./GameLine"

const Game = ({difficulty}) => {
  let width, height, bombsStart
  let isGameRunning = false
  switch (difficulty) {
    case 'easy':
      width = 8
      height = 8
      bombsStart = 10
      break;
    case 'medium':
      width = 16
      height = 16
      bombsStart = 40
      break;
    case 'expert':
      width = 31
      height = 16
      bombsStart = 99
      break;
    default:
      break;
  }

  const neighbourFields = (arr, row, col) => {
    if (row === 0) {
      if (col === 0) {
        return [
          arr[row][col+1],
          arr[row+1][col],
          arr[row+1][col+1]
        ]
      }
      if (col === width - 1) {
        return [
          arr[row][col-1],
          arr[row+1][col],
          arr[row+1][col-1]
        ]
      }
      return [
        arr[row][col+1],
        arr[row][col-1],
        arr[row+1][col+1],
        arr[row+1][col],
        arr[row+1][col-1]
      ]
    }
    if (row === height - 1) {
      if (col === 0) {
        return [
          arr[row][col+1],
          arr[row-1][col],
          arr[row-1][col+1]
        ]
      }
      if (col === width - 1) {
        return [
          arr[row][col-1],
          arr[row-1][col],
          arr[row-1][col-1]
        ]
      }
      return [
        arr[row][col+1],
        arr[row][col-1],
        arr[row-1][col-1],
        arr[row-1][col],
        arr[row-1][col+1]
      ]
    }
    if (col === 0) {
      return [
        arr[row+1][col],
        arr[row-1][col],
        arr[row+1][col+1],
        arr[row][col+1],
        arr[row-1][col+1]
      ]
    }
    if (col === width - 1) {
      return [
        arr[row+1][col],
        arr[row-1][col],
        arr[row+1][col-1],
        arr[row][col-1],
        arr[row-1][col-1]
      ]
    }
    return [
      arr[row+1][col],
      arr[row-1][col],
      arr[row][col+1],
      arr[row][col-1],
      arr[row-1][col-1],
      arr[row+1][col-1],
      arr[row-1][col+1],
      arr[row+1][col+1]
    ]
  }

  const render_bombs = () => {
    let bombsCounter = bombsStart
    const new_fields = []

    // CREATE FIELDS
    for (let row = 0; row < height; row++) {
      const line = []
      for (let col = 0; col < width; col++) {
        const field = {col, row, content: 0}
        line.push(field)
      }
      new_fields.push(line)
    }

    // ADD BOMBS AND NUMBERS
    parentLoop:
    while (bombsCounter > 0) {
      const probability = bombsStart / (width * height)
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if (Math.random() < probability) {
            new_fields[row][col].content = 'bomb'
            for (const field of neighbourFields(new_fields, row, col)) {
              if (field.content !== 'bomb') {
                field.content++
              }
            }
            bombsCounter--
            if (bombsCounter === 0) {
              break parentLoop
            }
          }
        }
      }
    }

    setFields(new_fields)
  }

  const showField = (row, col) => {
    const clicked = fields[row][col]

    document.getElementById(`${row}-${col}`).classList.remove('hidden')
    if (clicked.content === 0) {
      // console.log(neighbourFields(fields, row, col))
      neighbourFields(fields, row, col).forEach((field) => {
        if (document.getElementById(`${field.row}-${field.col}`).matches('.hidden')) {
          showField(field.row, field.col)
        }
      })
    }
  }

  const onClick = (e) => {
    const [row, col] = e.target.id.split('-')
    showField(parseInt(row), parseInt(col))
  }

  const [fields, setFields] = useState([])
  

  useEffect(() => {
    render_bombs()
  }, [difficulty])

  return (
    <div className="Game" onClick={onClick}>
      {fields.map(row => <GameLine key={row[0].row} row={row}/>)}
    </div>
  )
}

export default Game;
