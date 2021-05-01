import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { HEATMAP_FULL, HEATMAP_ZONE_QUARTER, BEST_MOVES } from './types'
import { Alert } from '../Alert'

const Wrapper = styled.div`
  color: #fff;
  padding: var(--gap);
  overflow-y: scroll;
`

const HelpHeader = styled.h2`
  padding-bottom: var(--gap);
`

const HelpGroup = styled.details`
  margin-bottom: var(--gap);
`

const HelpGroupHeader = styled.summary`
  outline: none;
  color: #fff;
  margin-bottom: var(--gap);
  cursor: pointer;
`

const HelpGroupList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--gap);
`

const HelpItem = styled.div`
  border-radius: var(--gap);
  border: 2px solid #20e7c1;
  background: ${(props) => (props.active ? '#20e7c1' : '#212529')};
  color: ${(props) => (props.active ? '#212529' : '#fff')};
  padding: var(--gap);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.active ? 'rgba(32,231,193,1)' : 'rgba(32,231,193,0.6)'};
  }
`
const RangeSpan = styled.span`
  margin-bottom: 1vh;
  font-size: 1.5rem;
  `

const RangeInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 1vh;
  margin-bottom: 1.5vh;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .3s;
  transition: opacity .3s;
  &::-webkit-slider-thumb{
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%; 
    background: #04AA6D;
    cursor: pointer;
  }
  &::-moz-range-thumb{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #04AA6D;
    cursor: pointer;
  }
`

const Range = ({ from = 1, to, step = 1, value, setValue }) => {
  useEffect(() => setValue(from), [])
  const handleChange = (e) => setValue(parseInt(e.target.value))

  return (
    <>
      <RangeSpan>{value}</RangeSpan>
      <RangeInput
        type="range"
        min={from}
        max={to}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}

const Help = ({ handleHelp, activeHelpId, scores }) => {
  const [dialog, setDialog] = useState(null)
  const [rangeValue, setRangeValue] = useState(0)

  const showDialog = (from, to, callback) => {
    setDialog({
      type: 'range',
      props: {
        from,
        to,
        setValue: setRangeValue,
      },
      callback,
    })
  }

  const helpers = [
    {
      title: 'Продвинутые подсказки',
      content: [
        {
          name: 'Тепловая карта',
          id: HEATMAP_FULL,
          command: () =>
            scores && handleHelp({ type: 'map', id: HEATMAP_FULL }),
        },
        {
          name: 'Выбрать лучший из N ходов',
          id: 16,
          command: () =>
            scores &&
            showDialog(2, 7, (value) =>
              handleHelp({
                type: 'multiple',
                multipleHandleCount: value + 1,
                id: 16,
              })
            ),
        },
        {
          name: 'Показать лучшие ходы',
          id: BEST_MOVES,
          command: () => {
            scores &&
              showDialog(1, 5, (value) =>
                handleHelp({
                  type: 'single',
                  count: value,
                  id: BEST_MOVES,
                })
              )
          },
        },
      ],
    },
    {
      title: 'Для дурачков',
      content: [
        {
          name: 'В какой четверти доски сейчас лучший ход?',
          id: HEATMAP_ZONE_QUARTER,
          command: () =>
            scores && handleHelp({ type: 'map', id: HEATMAP_ZONE_QUARTER }),
        },
      ],
    },
  ]

  return (
    <Wrapper>
      <HelpHeader>Подсказки</HelpHeader>
      {helpers.map((group, groupIndex) => (
        <HelpGroup key={groupIndex}>
          <HelpGroupHeader>{group.title}</HelpGroupHeader>
          <HelpGroupList>
            {group.content.map((helper, helperIndex) => (
              <HelpItem
                key={helperIndex}
                active={activeHelpId === helper.id}
                onClick={helper.command}
              >
                {helper.name}
              </HelpItem>
            ))}
          </HelpGroupList>
        </HelpGroup>
      ))}
      {dialog && (
        <Alert
          okCallback={() => dialog.callback(rangeValue)}
          close={() => setDialog(null)}
        >
          <Range {...dialog.props} value={rangeValue} />
        </Alert>
      )}
    </Wrapper>
  )
}

export default Help
