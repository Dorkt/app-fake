import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import layout from './layout/reducer'

const createRootReducer = (history: History) => combineReducers({
    layout,
    router: connectRouter(history)
})

export default createRootReducer

