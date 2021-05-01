import React from 'react'
import { Provider } from 'react-redux'
import { createReduxStore } from './store'
import Routes from './routes'
import styled from 'styled-components'
const store = createReduxStore()

const CSSVariables = styled.div`
  --gap: 10px;
`

const App = () => {
  return (
    <Provider store={store}>
      <CSSVariables>
        <Routes />
      </CSSVariables>
    </Provider>
  )
}

export default App
