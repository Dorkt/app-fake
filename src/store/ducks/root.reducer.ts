import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import layout from './layout/reducer'
import users from './user/reducer'

const createRootReducer = (history: History) => combineReducers({
    layout,
    users,
    router: connectRouter(history)
})

export default createRootReducer

