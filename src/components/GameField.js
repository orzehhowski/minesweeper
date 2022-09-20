import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faBomb, fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8 } from '@fortawesome/free-solid-svg-icons'

const GameField = ({fieldInfo}) => {
  let content
  if (fieldInfo.noticed) {
    content = <FontAwesomeIcon icon={faFlag} />
  }
  else {
    if (fieldInfo.hidden) {
      content = ""
    }
    else {
      switch (fieldInfo.content) {
        case 'bomb':
          content = <FontAwesomeIcon icon={faBomb} />
          break
        case 1:
          content = <FontAwesomeIcon icon={fa1} />
          break
        case 2:
          content = <FontAwesomeIcon icon={fa2} />
          break
        case 3:
          content = <FontAwesomeIcon icon={fa3} />
          break
        case 4:
          content = <FontAwesomeIcon icon={fa4} />
          break
        case 5:
          content = <FontAwesomeIcon icon={fa5} />
          break
        case 6:
          content = <FontAwesomeIcon icon={fa6} />
          break
        case 7:
          content = <FontAwesomeIcon icon={fa7} />
          break
        case 8:
          content = <FontAwesomeIcon icon={fa8} />
          break
        default:
          break
      }
    }
  }
  
  return (
    <div className={`field 
    ${fieldInfo.hidden ? 'hidden' : 'shown'} 
    f-${fieldInfo.content} 
    ${fieldInfo.noticed && 'noticed'}
    ${fieldInfo.lost && 'lost'}
    ${fieldInfo.won && 'won'}`} 
    id={`${fieldInfo.row}-${fieldInfo.col}`}>
      {content}
    </div>
  )
}

export default GameField;
