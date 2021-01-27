import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import multi from 'redux-multi'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './ducks/root.reducer'
import rootSaga from './ducks/root.sagas'

import { ILayoutState } from './ducks/layout/types'
import { IUserState } from './ducks/user/types'

export interface IApplicationState {
    layout: ILayoutState,
    Users: IUserState
}

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

/* composeWithDevTools is integration for plugin redux/devtools chrome.
* see https://github.com/zalmoxisus/redux-devtools-extension
* */
const store: Store<IApplicationState> = createStore(
    rootReducer(history),
    composeWithDevTools(
        applyMiddleware(multi, sagaMiddleware, routerMiddleware(history))
    )
)

sagaMiddleware.run(rootSaga)

export default store