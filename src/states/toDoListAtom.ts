import {atom} from 'jotai'
import { Tasks } from '../@types'

export const toDoListAtom = atom<Tasks[]>([])

export const isSecondBoxVisibleAtom = atom<boolean>(false)

