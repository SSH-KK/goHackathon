import { ButtonCustom } from '../../components/ButtonCustom'
import Board from './components/Board'

export const GameContainer = ({ passFn, ...args }) => {
  return (
    <div>
      <Board {...args} />
      <div style={{ bottom: 0, position: 'fixed' }}>
        <ButtonCustom onClick={passFn}>Pass</ButtonCustom>
      </div>
    </div>
  )
}
