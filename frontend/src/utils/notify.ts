import { toast } from "react-hot-toast"
// const notify = (action: string, msg: string): void => {
//     if (action === "success") {
//         toast.success(msg, {
//             position: toast.POSITION.TOP_RIGHT
//         })
//     }
//     if (action === "warning") {
//         toast.warning(msg, {
//             position: toast.POSITION.TOP_LEFT
//         })
//     }
//     if (action === "error") {
//         toast.error(msg, {
//             position: toast.POSITION.TOP_LEFT
//         })
//     }
// }

const notify = (action: string, msg: string) => {
    if (action === "success") {
        toast.success(msg, {
            duration: 1900
        })
    }

    if (action === "error" || action === "warning") {
        toast.error(msg, {
            duration: 2300
        })
    }
}


export default notify