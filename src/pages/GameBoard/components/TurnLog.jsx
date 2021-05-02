import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  overflow-y: scroll;
  color: #fff;
`

const ListElement = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 25%;
  margin-bottom: var(--gap);

  & > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--gap);
  }
`

const TimeWrapper = styled.div`
  background-color: ${props => (props.active ? '#20e7c1' : '')};
  color: ${props => (props.active ? '#212529' : '#fff')};
  border-radius: 0 var(--gap) var(--gap) 0;
  & > * {
    display: block;
  }
`

const PlaceContainer = styled.div`
  background-color: #20e7c1;
  color: #212529;
  border-radius: var(--gap) 0 0 var(--gap);
`

const EmptyMsgWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const TimeContainer = ({ timeStamp, active }) => {
  const time = new Date(timeStamp)

  return (
    <TimeWrapper active={active}>
      <span>{`${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`}</span>
      <span>{`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}</span>
    </TimeWrapper>
  )
}

const TurnLog = ({ turns }) => {
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [turns])

  return (
    <Wrapper>
      {turns.length ? (
        <>
          {turns.map((turn, index) => (
            <ListElement key={index}>
              <TimeContainer
                active={index === turns.length - 1}
                timeStamp={turn.timeStamp}
              />
              <div>
                <span>{turn.name}</span>
                <span>{turn.color}</span>
              </div>
              <PlaceContainer>
                <span>{turn.place ? turn.place : 'PASS'}</span>
              </PlaceContainer>
            </ListElement>
          ))}
          <div ref={endRef} />
        </>
      ) : (
        <EmptyMsgWrapper>
          <h2>Пока нет ходов</h2>
          <h1>:(</h1>
        </EmptyMsgWrapper>
      )}
    </Wrapper>
  )
}

export default TurnLog
