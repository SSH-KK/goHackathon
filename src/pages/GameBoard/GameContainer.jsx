import { ButtonCustom } from '../../components/ButtonCustom'
import Board from './components/Board'

export const GameContainer = ({ passFn, ...args }) => {
  return (
    <div style={{'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center'}}>
      <div>
        <h4>adakdjak</h4>
      </div>
      <Board {...args} />
      <div>
        <h4>adakdjak</h4>
      </div>
      <div style={{ bottom: 0, position: 'fixed' }}>
        <ButtonCustom onClick={passFn}>Pass</ButtonCustom>
      </div>
    </div>
  )
}
