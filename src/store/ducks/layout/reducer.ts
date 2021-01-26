import { Reducer } from 'redux'
import { ILayoutState, LayoutTypes } from './types'

const INITIAL_STATE: ILayoutState = {
    email: ''
}


const reducer: Reducer<ILayoutState> = (state: ILayoutState = INITIAL_STATE, action: any) => {
    switch (action.type) {

        case LayoutTypes.CHANGE_EMAIL:
            const { email } = action.payload
            return { ...state, email }

        default:
            return state
    }
}

export default reducer