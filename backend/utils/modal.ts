import { Modal } from '../type'

const ERROR: Modal = {
    success: false,
    action: 'error',
}

const SUCCESS: Modal = {
    success: true,
    action: 'success'
}

const ACCESS_DENIED: Modal = {
    ...ERROR,
    msg: 'Access Denied.'
}

export { ERROR, SUCCESS, ACCESS_DENIED }