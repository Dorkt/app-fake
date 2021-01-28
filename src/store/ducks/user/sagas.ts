import usersService from '../../../services/users/user'
import User from '../../application/models/users/user'
import { all, apply, put, takeLatest} from 'redux-saga/effects'
import {
    createUserFailure,
    createUserSucess,
    findUserFailure,
    findUserSucess,
    loadUsersRequest,
    loadUsersFailure,
    loadUsersSucess,
    removeUSerFailure,
    removeUserSucess,
    updateUserFailure,
    updateUserSucess
} from './actions'
import { IActionType, IAxiosResponse } from '../root.types'
import { UserActionTypes } from './types'

function* create(action: IActionType) {
    try {
        const { user } = action.payload
        const response = yield apply(usersService, usersService.create, [user])
        yield put<any>(createUserSucess(response.data))
    } catch(err) {
        yield put(createUserFailure(err))
    }
}

function* getAll(action: IActionType) {
    try {
        const { paginator } = action.payload
        const response: any = yield apply(usersService, usersService.getAll, [paginator])
        yield put<any>(loadUsersSucess(response))
    } catch(err) {
        yield put(loadUsersFailure(err))
    }
}

export default function* userSaga() {
    return yield all([
        takeLatest(UserActionTypes.CREATE_REQUEST, create),
        takeLatest(UserActionTypes.LOAD_USERS_REQUEST, getAll)
    ])
}