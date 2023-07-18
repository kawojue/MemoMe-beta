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

const SMTH_WRONG: Modal = {
    ...ERROR,
    msg: 'Sorry, something went wrong.'
}

const CRED_BLANK: Modal = {
    ...ERROR,
    msg: 'Credentials cannot be blank.'
}

const INC_PSWD: Modal = {
    ...ERROR,
    msg: 'Incorrect Password.'
}

export {
    ERROR, SUCCESS, ACCESS_DENIED,
    SMTH_WRONG, CRED_BLANK, INC_PSWD
}