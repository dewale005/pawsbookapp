import { LIGHT_MODE, DARK_MODE } from './action.types'

export const daymode = () => {
    return {
        type: LIGHT_MODE
    }
}
export const nightmode = () => {
    return {
        type: DARK_MODE
    }
}