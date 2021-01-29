import usersService from '../../../services/users/user'
import User from '../../application/models/users/user'
import { all, apply, put, takeLatest } from 'redux-saga/effects'
import {
    createUserFailure,
    createUserSucess,
    findUserFailure,
    findUserSucess,
    loadUsersFailure,
    loadUsersSucess,
    removeUserFailure,
    removeUserSucess,
    updatedUserFailure,
    updatedUserSucess
} from './actions'
import { IActionType } from '../root.types'
import { UserActionTypes } from './types'

function* create(action: IActionType) {
    try {
        const { user } = action.payload
        const response = yield apply(usersService, usersService.create, [user])
        yield put<any>(createUserSucess(response.data))
    } catch (err) {
        yield put(createUserFailure(err))
    }
}

function* getAll(action: IActionType) {
    try {
        const { paginator } = action.payload
        const response: any = yield apply(usersService, usersService.getAll, [paginator])
        yield put<any>(loadUsersSucess(response))
    } catch (err) {
        yield put(loadUsersFailure(err))
    }
}

function* getById(action: IActionType) {
    try {
        const { userId } = action.payload
        const response: any = yield apply(usersService, usersService.getById, [userId])
        yield put<any>(findUserSucess(response.data))
    } catch (err) {
        yield put(findUserFailure(err))
    }
}

function* updated(action: IActionType) {
    try {
        const { user } = action.payload
        const response: User = yield apply(usersService, usersService.updated, [user])
        yield put<any>(updatedUserSucess(response))
    } catch (err) {
        yield put(updatedUserFailure(err))
    }
}

function* remove(action: IActionType) {
    try {
        const { userIdForRemove } = action.payload
        yield apply(usersService, usersService.remove, [userIdForRemove])
        yield put<any>(removeUserSucess())
    } catch (err) {
        yield put(removeUserFailure(err))
    }
}

export default function* userSaga() {
    return yield all([
        takeLatest(UserActionTypes.CREATE_REQUEST, create),
        takeLatest(UserActionTypes.LOAD_USERS_REQUEST, getAll),
        /**
         * TODO getAll e getById disparando a LOAD_USERS_REQUEST
         * getById - FIND_REQUEST
         */
        takeLatest(UserActionTypes.LOAD_USERS_REQUEST, getById),
        takeLatest(UserActionTypes.UPDATED_REQUEST, updated),
        takeLatest(UserActionTypes.REMOVE_REQUEST, remove)
    ])
}