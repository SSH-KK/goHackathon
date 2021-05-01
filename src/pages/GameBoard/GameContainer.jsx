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
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
      }}
    >
      <div>
        <h4>adakdjak</h4>
      </div>
      <Board {...args} yourColor={yourColor} />
      <div>
        <h4>adakdjak</h4>
      </div>
      <div style={{ bottom: 0, position: 'fixed' }}>
        <ButtonCustom onClick={passFn}>Pass</ButtonCustom>
        <ButtonCustom onClick={() => setShowTerritory(true)}>
          showTerritory
        </ButtonCustom>
      </div>
    </div>
  )
}
