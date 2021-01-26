import { action } from 'typesafe-actions'
import { LayoutTypes } from './types'

export const changeEmail = (data: string) => action(LayoutTypes.CHANGE_EMAIL, { email: data })