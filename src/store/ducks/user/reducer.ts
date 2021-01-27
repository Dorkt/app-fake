import { Reducer } from 'redux'
import { IUserState, UserActionTypes } from './types'
import User from '../../application/models/users/user'

export const INITIAL_STATE: IUserState = {
    createUser: {
        user: new User(),
        data: new ErrorEvent(''),
        loading: false,
        error: false,
        success: false
    },
    removeUser: {
        userIdForRemove: '',
        visibilityModal: false,
        loading: false,
        error: false,
        success: false
    },
    listUsers: {
        users: [],
        paginator: {
            first: 0,
            rows: 5,
            page: 0,
            pageCount: 0,
            totalRecords: 0,
            search: {
                key: '',
                value: ''
            }
        },
        loading: false,
        error: false,
        success: false,
    }
}

const reducer: Reducer<IUserState> = (state: IUserState = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case UserActionTypes.RESET_CREATE_USER:
            return {...state, createUser: INITIAL_STATE.createUser }

        case UserActionTypes.CHANGE_USER:
            const { user } = action.payload
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    user: new User().fromJSON(user)
                }
            }

        case UserActionTypes.CHANGE_PAGINATOR:
            const { paginator } = action.payload
            return {
                ...state,
                listUsers: {
                    ...state.listUsers,
                    loading: true,
                    paginator
                }             
            }

        case UserActionTypes.CHANGE_REMOVE_DIALOG:
            const { visibilityModal, userIdForRemove } = action.payload
            return {
                ...state,
                removeUser: { ...state.removeUser, visibilityModal, userIdForRemove }
            }
            
        case UserActionTypes.CREATE_REQUEST:
            return { ...state, createUser: { ...state.createUser, loading: true }}

        case UserActionTypes.CREATE_SUCESS:
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    user: new User(),
                    sucess: true,
                }
            }
        
        case UserActionTypes.CREATE_FAILURE:
            const createError = action.payload.error
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    error: true,
                    data: createError
                }
            }

        case UserActionTypes.FIND_REQUEST:            
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: true
                }
            }

        case UserActionTypes.FIND_SUCESS:
            const findUser = action.payload.user
            return{
                ...state,
                createUser: {
                    ...state.createUser,
                    user: new User().fromJSON(findUser),
                    loading: false
                }
            }
            
        case UserActionTypes.FIND_FAILURE:
            const findError = action.payload.error
            return {
                ...state,
                createUser: {
                    ...state.createUser,
                    loading: false,
                    error: true,
                    success: false,
                    data: findError
                }
            }

        case UserActionTypes.LOAD_USERS_REQUEST:
            return {
                ...state,
                listUsers: {
                    ...state.listUsers,
                    loading: true
                }
            }

        case UserActionTypes.LOAD_USERS_SUCESS:
            const { users: { data: daousers }, headers } = action.payload
            return {
                ...state,
                listUsers: {
                    ...state.listUsers,
                    loading: false,
                    sucess: true,
                    error: false,
                    users: daousers,
                    paginator: {
                        ...state.listUsers.paginator,
                        totalRecords: parseInt(headers['x-total-count'], 10)
                    }
                }
            }

        case UserActionTypes.LOAD_USERS_FAILURE: 
            return {
                ...state,
                listUsers: {
                    ...state.listUsers,
                    loading: false,
                    error: true
                }
            }

        default: 
            return state        
    }
}

export default reducer