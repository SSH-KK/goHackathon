import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
  BEST_MOVES,
  SHOULD_PASS,
  HEATMAP_QUARTER,
} from './types'
import { Alert } from '../Alert'
import { useSelector } from 'react-redux'
import { countDiff } from '../../../../helpers/rightBar'
import { Range } from './components/Range'
import { Radio } from './components/Radio'
import { ZonesSelect } from './components/ZonesSelect'

const Wrapper = styled.div`
  color: #fff;
  padding: var(--gap);
  overflow-y: scroll;
`

const HelpHeader = styled.h2`
  padding-bottom: var(--gap);
`

const HelpGroupList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  flex-wrap: wrap;
  flex-basis: 50%;
  margin-bottom: 10px;
`

const HelpItem = styled.div`
  border-radius: var(--gap);
  border: 2px solid #20e7c1;
  background: ${props => (props.active ? '#20e7c1' : '#212529')};
  color: ${props => (props.active ? '#212529' : '#fff')};
  padding: var(--gap);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  text-align: center;

  &:hover {
    background-color: ${props =>
      props.active ? 'rgba(32,231,193,1)' : 'rgba(32,231,193,0.6)'};
  }
`

const Help = ({ handleHelp, activeHelpId, scores, currentMap, yourColor }) => {
  const [dialog, setDialog] = useState(null)
  const [rangeValue, setRangeValue] = useState(0)
  const [zone, setZone] = useState(0)

  const possibleEnemyMove = useSelector(state => state.board.possibleEnemyMove)

  const showDialog = (callback, componentProps) => {
    setDialog({
      ...componentProps,
      callback,
    })
  }

  useEffect(() => {
    ;(async () => {
      if (possibleEnemyMove) {
        const diff = await countDiff(currentMap, possibleEnemyMove, yourColor)
        setDialog({
          description:
            `В лучшем случае противник сделает ход ${possibleEnemyMove}, а вы ` +
            (diff >= 0
              ? 'получите ' + diff
              : 'потеряете ' + -diff + ' территорий'),
          callback: () => {},
        })
      }
    })()
    // eslint-disable-next-line
  }, [possibleEnemyMove])

  const helpers = [
    {
      name: 'Выбрать лучший из N ходов (2)',
      id: 16,
      command: () =>
        scores &&
        showDialog(
          value =>
            handleHelp({
              type: 'multiple',
              multipleHandleCount: value + 1,
              id: 16,
            }),
          {
            type: 'range',
            props: { from: 2, to: 7, setValue: setRangeValue },
            description: 'Сколько ходов проверить?',
          }
        ),
    },
    {
      name: 'Показать лучшие ходы (3)',
      id: BEST_MOVES,
      command: () => {
        scores &&
          showDialog(
            value =>
              handleHelp({
                type: 'single',
                count: value,
                id: BEST_MOVES,
              }),
            {
              type: 'range',
              props: { from: 1, to: 5, setValue: setRangeValue },
              description: 'Сколько ходов показать?',
            }
          )
      },
    },
    {
      name: 'Тепловая карта (2)',
      id: HEATMAP_FULL,
      command: () =>
        scores &&
        !possibleEnemyMove &&
        handleHelp({ type: 'map', id: HEATMAP_FULL }),
    },
    {
      name: 'Показать хитмап четверти доски (1)',
      id: HEATMAP_QUARTER,
      command: () => {
        scores &&
          showDialog(
            value =>
              handleHelp({
                type: 'map',
                quarter: value,
                id: HEATMAP_QUARTER,
              }),
            {
              type: 'zone',
              props: { setValue: setZone },
              description: 'Какую зону вы хотите отобразить?',
            }
          )
      },
    },
    {
      name: 'В какой четверти доски сейчас лучший ход? (1)',
      id: HEATMAP_ZONE_QUARTER,
      command: () =>
        scores && handleHelp({ type: 'map', id: HEATMAP_ZONE_QUARTER }),
    },
    {
      name: 'Стоит ли пасовать? (3)',
      id: SHOULD_PASS,
      command: () =>
        scores &&
        handleHelp({
          type: 'score',
          id: SHOULD_PASS,
        }),
    },
  ]

  return (
    <Wrapper>
      <HelpHeader>Подсказки</HelpHeader>
      <HelpGroupList>
        {helpers.map((helper, helperIndex) => (
          <HelpItem
            key={helperIndex}
            active={activeHelpId === helper.id}
            onClick={helper.command}
          >
            {helper.name}
          </HelpItem>
        ))}
      </HelpGroupList>

      {dialog && (
        <Alert
          okCallback={() =>
            dialog.callback(
              (dialog.type === 'range' && rangeValue) ||
                (dialog.type === 'zone' && zone)
            )
          }
          close={() => setDialog(null)}
        >
          {dialog.description && <p>{dialog.description}</p>}
          {dialog.type === 'range' && (
            <Range {...dialog.props} value={rangeValue} />
          )}
          {dialog.type === 'radio' && <Radio {...dialog.props} />}
          {dialog.type === 'zone' && <ZonesSelect {...dialog.props} />}
        </Alert>
      )}
    </Wrapper>
  )
}

export default Help
