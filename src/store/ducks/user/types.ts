/* Action types */
import User from '../../application/models/users/user'
import { IPaginator, IComponentState } from '../root.types'

export enum UserActionTypes {
    RESET_CREATE_USER = '@users/RESET_CREATE_USER',

    CHANGE_USER = '@users/CHANGE_USER',
    CHANGE_PAGINATOR = '@users/CHANGE_PAGINATOR',
    CHANGE_SEARCH_PAGINATOR = '@users/CHANGE_SEARCH_PAGINATOR',
    CHANGE_REMOVE_DIALOG = '@users/CHANGE_REMOVE_DIALOG',
    CHANGE_UPDATED_DIALOG = '@users/CHANGE_UPDATED_DIALOG',
    
    CREATE_REQUEST = '@users/CREATE_REQUEST',
    CREATE_SUCESS = '@users/CREATE_SUCESS',
    CREATE_FAILURE = '@users/CREATE_FAILURE',

    FIND_REQUEST = '@users/FIND_REQUEST',
    FIND_SUCESS = '@users/FIND_SUCESS',
    FIND_FAILURE = '@users/CREATE_FAILURE',

    LOAD_USERS_REQUEST = '@users/LOAD_USERS_REQUEST',
    LOAD_USERS_SUCESS = '@users/LOAD_USERS_SUCESS',
    LOAD_USERS_FAILURE = '@users/LOAD_USERS_FAILURE',

    UPDATED_REQUEST = '@users/UPDATED_REQUEST',
    UPDATED_SUCESS = '@users/UPDATED_SUCESS',
    UPDATED_FAILURE = '@users/UPDATED_FAILURE',

    REMOVE_REQUEST = '@users/REMOVE_REQUEST',
    REMOVE_SUCESS = '@users/REMOVE_SUCESS',
    REMOVE_FAILURE = '@users/REMOVE_FAILURE'
}

interface ICreateState extends IComponentState {
    readonly user: User
    readonly visibilityDialog: boolean
    readonly data: ErrorEvent
}

interface IRemoveState extends IComponentState {
    readonly visibilityModal: boolean
    readonly userIdForRemove: string
}

interface IListUserState extends IComponentState {
    readonly users: User[]
    readonly paginator: IPaginator
}

export interface IUserState {
    readonly createUser: ICreateState,
    readonly removeUser: IRemoveState,
    readonly listUsers: IListUserState,
}