import { action } from 'typesafe-actions'
import { UserActionTypes } from './types';
import { IPaginator } from '../root.types';
import User from '../../application/models/users/user'
import { IAxiosResponse } from '../root.types';

/* Actions for Reset State */
export const resetCreateUser = () => action(UserActionTypes.RESET_CREATE_USER, {})

/* Actions for Change */
export const changeUser = (user: User) => action(UserActionTypes.CHANGE_USER, { user })

export const changePaginator = (paginator: IPaginator) => [
    action(UserActionTypes.CHANGE_PAGINATOR, { paginator }),
    loadUsersRequest(paginator)
]

export const changeRemoveDialog = (visibilityModal: boolean, usedIdForRemove?: string) => action(UserActionTypes.CHANGE_REMOVE_DIALOG, {
    visibilityModal,
    usedIdForRemove
})

/* Actions for Create User */
export const createUserRequest = (user: User) => [
    action(UserActionTypes.CREATE_REQUEST, { user }),
    resetCreateUser()
]

export const createUserSucess = (user: User) => action(UserActionTypes.CREATE_SUCESS, { user })

export const createUserFailure = (error: ErrorEvent) => action(UserActionTypes.CREATE_FAILURE, { error })

/* Actions for find User */
export const findUserRequest = (userId: string) => action(UserActionTypes.FIND_REQUEST, { userId })

export const findUserSucess = (user: User) => action(UserActionTypes.FIND_SUCESS, { user })

export const findUserFailure = (error: ErrorEvent) => action(UserActionTypes.FIND_FAILURE, { error })

/* Actions for Load User */
export const loadUsersRequest = (paginator?: IPaginator) => action(UserActionTypes.LOAD_USERS_SUCESS, { paginator })

export const loadUsersSucess = (response: IAxiosResponse<User[]>) => action(UserActionTypes.LOAD_USERS_SUCESS, {
    users: response.data,
    headers: response.headers
})

export const loadUsersFailure = (error: ErrorEvent) => action(UserActionTypes.LOAD_USERS_FAILURE, { error })

/* Actions for update Users */

export const updateUserRequest = (user: User) => action(UserActionTypes.UPDATE_REQUEST, { user })

export const updateUserSucess = (user: User) => action(UserActionTypes.UPDATE_SUCESS, { user })

export const updateUserFailure = (error: ErrorEvent) => action(UserActionTypes.UPDATE_FAILURE, { error })

/* Actions for remove Users */

export const removeUserRequest = (usedIdForRemove: string) => action(UserActionTypes.REMOVE_REQUEST, { usedIdForRemove })

export const removeUserSucess = () => action(UserActionTypes.REMOVE_SUCESS, {})

export const removeUSerFailure = (error: ErrorEvent) => action(UserActionTypes.REMOVE_FAILURE, { error })
