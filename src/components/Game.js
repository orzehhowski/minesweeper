import { useEffect, useState } from "react"
import GameLine from "./GameLine"

const Game = ({difficulty}) => {
  let width, height, bombsStart
  const [isGameRunning, setIsGameRunning] = useState(false)
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

  const initFields = () => {
    const new_fields = []

    for (let row = 0; row < height; row++) {
      const line = []
      for (let col = 0; col < width; col++) {
        const field = {col, row, content: 0, hidden: true}
        line.push(field)
      }
      new_fields.push(line)
    }
    return new_fields
  }

  const render_bombs = () => {
    let bombsCounter = bombsStart
    const new_fields = initFields()

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
    const newFields = [...fields]
    newFields[row][col].hidden = false
    if (newFields[row][col].content === 0) {
      neighbourFields(newFields, row, col).forEach((field) => {
        if (field.hidden) {
          showField(field.row, field.col)
        }
      })
    }
    setFields(newFields)
  }

  const onClick = (e) => {
    // if (e.target.matches('.field')) {
      // const [row, col] = e.target.id.split('-')

      if (! isGameRunning) {
        setIsGameRunning(true)
        render_bombs()
      }

      // showField(parseInt(row), parseInt(col))
    // }
  }

  const [fields, setFields] = useState(initFields())
  

  return (
    <div className="Game" onClick={onClick} >
      {fields.map(row => <GameLine showField={showField} key={row[0].row} row={row}/>)}
    </div>
  )
}

export default Game;
