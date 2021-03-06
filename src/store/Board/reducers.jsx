import {
  SINGLE_HELP,
  MARKERS_CLEAR,
  MULTIPLE_HELP,
  MAP_HELP,
  WINNER_USER,
  LOSER_USER,
  SET_BLOCKED,
  MAP_STONES,
  SCORES,
  SCORES_WINNER,
  TERRITORY_SHOW,
  SET_HINT_WORST_ENEMY_MOVE,
} from './types'
import {
  MAP_HALF,
  MAP_QUARTERS,
} from '../../pages/GameBoard/components/Help/types'

const initialState = {
  markers: {},
  classNamesMapStones: {},
  mapStones: {},
  winner: null,
  loser: null,
  blocked: false,
  scores: null,
  scoresWinner: null,
  possibleEnemyMove: null,
}

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_HELP:
      return {
        ...state,
        markers: action.payload,
        blocked: false,
      }
    case SET_BLOCKED:
      return {
        ...state,
        blocked: action.payload,
      }
    case MULTIPLE_HELP:
      return {
        ...state,
        markers: {},
        blocked: false,
      }
    case TERRITORY_SHOW: {
      let mapStones = {}
      let classNamesMapStones = {}
      let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
      if (action.payload.displayTer) {
        action.payload.territory.forEach((row, rowId) => {
          row.forEach((cell, colId) => {
            let sign = alpha[rowId]
            let coord = `${sign}${colId + 1}`
            mapStones[coord] = 'territory_show'
            classNamesMapStones[coord] = `sl_${cell}`
          })
        })
      }
      if (action.payload.displayDead) {
        action.payload.dead.forEach((row, rowId) =>
          row.forEach((col, colId) => {
            if (col === 1) {
              let sign = alpha[rowId]
              let coord = `${sign}${colId + 1}`
              mapStones[coord] = 'dead_show'
            }
          })
        )
      }
      return {
        ...state,
        mapStones,
        classNamesMapStones,
        blocked: false,
      }
    }
    case MARKERS_CLEAR:
      return {
        ...state,
        markers: {},
        mapStones: {},
        classNamesMapStones: {},
        scores: null,
        scoresWinner: null,
        possibleEnemyMove: null,
      }
    case MAP_STONES:
      return {
        ...state,
        mapStones: action.payload,
        blocked: false,
      }
    case MAP_HELP: {
      let mapStones = {},
        classNamesMapStones = {}
      if (action.payload.zone) {
        const values = action.payload.isQuarter
          ? MAP_QUARTERS[action.payload.zone]
          : MAP_HALF[action.payload.zone]
        mapStones = values.mapStones
        classNamesMapStones = values.classNamesMapStones
      } else {
        let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
        action.payload.forEach((row, rowId) => {
          row.forEach((cell, colId) => {
            if (parseInt(cell) !== 0) {
              let sign = alpha[rowId]
              let coord = `${sign}${colId + 1}`
              mapStones[coord] = 'circle_gradient'
              classNamesMapStones[coord] = `redstone size-${cell}`
            }
          })
        })
      }

      return {
        ...state,
        mapStones,
        classNamesMapStones,
        blocked: false,
      }
    }
    case WINNER_USER:
      return {
        ...state,
        winner: action.payload,
      }
    case LOSER_USER:
      return {
        ...state,
        loser: action.payload,
      }
    case SCORES:
      return {
        ...state,
        scores: action.payload,
        blocked: false,
      }
    case SCORES_WINNER:
      return {
        ...state,
        scoresWinner: action.payload,
        blocked: false,
      }
    case SET_HINT_WORST_ENEMY_MOVE:
      return {
        ...state,
        possibleEnemyMove: action.payload,
        blocked: false,
      }
    default:
      return { ...state }
  }
}
