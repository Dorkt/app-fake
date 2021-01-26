import { Action } from "redux"

/**
 * Search interface
 */
export interface ISearch {
    key: string
    value: string
}

/**
 * Paginator interface
 */
export interface IPaginator {
    first: number
    rows: number
    page: number
    pageCount: number
    totalRecords: number
    search: ISearch
}

/**
 * Component State
 */
export interface IComponentState {
    readonly loading: boolean
    readonly error: boolean
    readonly success: boolean
}

/**
 * Action type
 */
export interface IActionType<T = any> extends Action {
    payload: T
    error: boolean
    meta: any
}

/**
 * Axios response type
 */
export interface IAxiosResponse<T = any> extends Action {
    data: T
    headers: any
}