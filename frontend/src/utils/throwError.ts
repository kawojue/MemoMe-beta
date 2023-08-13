import notify from "./notify"

const throwError = (err: any): void => {
    const msg = err.response?.data?.msg
    const action = err.response?.data?.action
    if (action) {
        notify(action, msg)
    } else {
        notify("error", err.code)
    }
}

export default throwError