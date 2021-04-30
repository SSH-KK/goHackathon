import GameInfo from "./components/GameInfo"
import Help from "./components/Help"

export const RightContainer = ({
  you,
  hint,
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
}) => {
  return !hint ? (
    <GameInfo
      you={you}
      opponent={opponent}
      stepColor={stepColor}
      yourColor={yourColor}
      turns={turns}
      enemyPass={enemyPass}
      stepMain={stepMain}
      times={times}
      stepTwo={stepTwo}
    />
  ) : (
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
    />
  )
}
