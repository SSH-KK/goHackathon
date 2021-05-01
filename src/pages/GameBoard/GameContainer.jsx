import { ButtonCustom } from '../../components/ButtonCustom'
import Board from './components/Board'
import { countPercentage } from '../../helpers/gameComponent'

export const GameContainer = ({
  passFn,
  setShowTerritory,
  probabilityMap,
  yourColor,
  ...args
}) => {
  console.log(probabilityMap)
  console.log(countPercentage(probabilityMap, yourColor))
  return (
    <div>
      <Board {...args} yourColor={yourColor} />
      <div style={{ bottom: 0, position: 'fixed' }}>
        <ButtonCustom onClick={passFn}>Pass</ButtonCustom>
        <ButtonCustom onClick={() => setShowTerritory(true)}>
          showTerritory
        </ButtonCustom>
      </div>
    </div>
  )
}
