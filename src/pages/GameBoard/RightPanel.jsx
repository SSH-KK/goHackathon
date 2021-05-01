import styled from 'styled-components'
import TurnLog from './components/TurnLog'
import Help from './components/Help'

const RightWrapper = styled.div`
  height: 100vh;
  padding: var(--gap);
  width: 100%;
`

const RightContainer = styled.div`
  background-color: #212529;
  border-radius: var(--gap);
  overflow: hidden;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 100%;
`

export const RightPanel = ({
  you,
  opponent,
  stepColor,
  yourColor,
  turns,
  enemyPass,
  stepMain,
  stepTwo,
  setHint,
  handleHelp,
  helpType,
  multipleType,
  mapType,
  activeHelpId,
  times,
  currentMap,
}) => {
  return (
    <RightWrapper>
      <RightContainer>
        <TurnLog turns={turns} />
        <Help
          you={you}
          opponent={opponent}
          stepColor={stepColor}
          yourColor={yourColor}
          turns={turns}
          enemyPass={enemyPass}
          stepMain={stepMain}
          stepTwo={stepTwo}
          currentColor={yourColor}
          setHint={setHint}
          handleHelp={handleHelp}
          helpType={helpType}
          multipleType={multipleType}
          mapType={mapType}
          activeHelpId={activeHelpId}
          times={times}
          scores={stepColor !== yourColor ? false : true}
          currentMap={currentMap}
        />
      </RightContainer>
    </RightWrapper>
  )
}
