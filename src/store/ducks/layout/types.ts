/**
 * Action types
 */
export enum LayoutTypes {
    CHANGE_EMAIL = '@layout/CHANGE_EMAIL',
}

/**
 * State type
 */
export interface ILayoutState {
    readonly email: string
}