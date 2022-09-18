import { useEffect, useState, useRef } from "react"
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
    const newFields = []

    for (let row = 0; row < height; row++) {
      const line = []
      for (let col = 0; col < width; col++) {
        const field = {col, row, content: 0, hidden: true}
        line.push(field)
      }
      newFields.push(line)
    }
    return newFields
  }

  const render_bombs = (startRow, startCol) => {
    let bombsCounter = bombsStart
    const newFields = initFields()

    // ADD BOMBS AND NUMBERS
    parentLoop:
    while (bombsCounter > 0) {
      const probability = bombsStart / (width * height)
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if ((row < startRow - 1 || row > startRow + 1) || (col < startCol - 1 || col > startCol + 1)) {
            if (Math.random() < probability) {
              newFields[row][col].content = 'bomb'
              for (const field of neighbourFields(newFields, row, col)) {
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
    }

    return newFields
  }



  const showField = (fieldsToEdit, row, col) => {
    fieldsToEdit[row][col].hidden = false
    if (fieldsToEdit[row][col].content === 0) {
      neighbourFields(fieldsToEdit, row, col).forEach((field) => {
        if (field.hidden) {
          showField(fieldsToEdit, field.row, field.col)
        }
      })
    }
  }

  const onClick = (e) => {
    if (e.target.matches('.field')) {
      const [row, col] = e.target.id.split('-')
      
      if (! isGameRunning) {
        setIsGameRunning(true)
        const newFields = render_bombs(parseInt(row), parseInt(col))
        showField(newFields, parseInt(row), parseInt(col))
        setFields(newFields)
      } else {
        const newFields = [...fields]
        showField(newFields, parseInt(row), parseInt(col))
        setFields(newFields)
      }
    }
  }

  const [fields, setFields] = useState(initFields())

  useEffect(() => {
    setFields(initFields())
    setIsGameRunning(false)
  }, [difficulty])

  const onContextMenu = (ev) => {
    ev.preventDefault()

  }

  return (
    <div onContextMenu={onContextMenu} className="Game" onClick={onClick} >
      {fields.map(row => <GameLine 
      showField={showField}
      key={row[0].row} row={row}/>)}
    </div>
  )
}

export default Game;
