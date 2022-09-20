import { useEffect, useState } from "react"
import GameLine from "./GameLine"

const Game = ({difficulty, onBombNoticed, isGameRunning, setIsGameRunning, newGame, bombsNoticed, isGameLost, setIsGameLost}) => {
  let width, height, bombsStart
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
        const field = {col, row, content: 0, hidden: true, noticed: false, lost: false}
        line.push(field)
      }
      newFields.push(line)
    }
    return newFields
  }

  const render_bombs = (startRow, startCol) => {
    let bombsCounter = bombsStart
    const newFields = initFields()

    parentLoop:
    while (bombsCounter > 0) {
      const probability = bombsStart / (width * height)
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if ((row < startRow - 1 || row > startRow + 1) || (col < startCol - 1 || col > startCol + 1)) {
            if (Math.random() < probability) {
              newFields[row][col].content = 'bomb'
              bombsCounter--
              if (bombsCounter === 0) {
                break parentLoop
              }
            }
          }
        }
      }
    }
    for (const line of newFields) {
      for (const field of line) {
        if (field.content === 'bomb') {
          neighbourFields(newFields, field.row, field.col).forEach(f => {
            if (f.content !== 'bomb') {
              f.content++
            }
          })
        }
      }
    }

    return newFields
  }



  const showField = (fieldsToEdit, row, col) => {
    const toShow = fieldsToEdit[row][col]
    if (! toShow.noticed) {

      if (toShow.hidden) {

        toShow.hidden = false
        if (toShow.content === 'bomb') {
          setIsGameLost(true)
          setIsGameRunning(false)
          toShow.lost = true
        }
        
        if (toShow.content === 0) {
          neighbourFields(fieldsToEdit, row, col).forEach((field) => {
            if (field.hidden) {
              showField(fieldsToEdit, field.row, field.col)
            }
          })
        }
      } else {
        let nearBombs = 0
        neighbourFields(fieldsToEdit, row, col).forEach((field) => {
          if (field.noticed) {
            nearBombs++
          }
        })
        if (nearBombs === toShow.content) {
          neighbourFields(fieldsToEdit, row, col).forEach((field) => {
            if (field.hidden) {
              showField(fieldsToEdit, field.row, field.col)
            }
          })
        }
      }
    }
  }

  const noticeField = (fieldsToEdit, row, col) => {
    const field = fieldsToEdit[row][col]
    
      if (field.hidden) {
        if (field.noticed) {
          field.noticed = false
          onBombNoticed(false)
        }
        else {
          if (bombsStart - bombsNoticed !== 0) {
            field.noticed = true
            onBombNoticed(true)
          }
        }
      }
  }

  const onClick = (e) => {
    if (e.target.matches('.field')) {
      const [row, col] = e.target.id.split('-')
      let newFields
      if (! isGameRunning && ! isGameLost) {
        setIsGameRunning(true)
        newFields = render_bombs(parseInt(row), parseInt(col))
      } else {
        newFields = [...fields]
      }
      if (!isGameLost) {
        showField(newFields, parseInt(row), parseInt(col))
        setFields(newFields)
      }
    }
  }
  
  const onContextMenu = (ev) => {
    ev.preventDefault()
    const coords = ev.target.id.split('-')
    coords.forEach(str => parseInt(str))
    if (isGameRunning) {
      const newFields = [...fields]
      noticeField(newFields, ...coords)
    }
  }

  const [fields, setFields] = useState(initFields())

  useEffect(() => {
    setFields(initFields())
    setIsGameRunning(false)
  }, [difficulty, newGame])

  return (
    <div onContextMenu={onContextMenu} className="Game" onClick={onClick} >
      {fields.map(row => <GameLine 
      showField={showField}
      key={row[0].row} row={row}/>)}
    </div>
  )
}

export default Game;
